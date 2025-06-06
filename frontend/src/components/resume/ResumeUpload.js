import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Snackbar,
  Alert,
  Slide,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useDropzone } from "react-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useTheme } from "../layout/ThemeContext";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const [suggestedRoles, setSuggestedRoles] = useState([]);
  const [skills, setSkills] = useState("");
  const [score, setScore] = useState(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    multiple: false,
  });

  const handleUpload = async () => {
    if (!file) {
      setSnackbarMsg("Please select a file first.");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/user/upload-resume/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedText = response.data.resume_text || "";
      setSnackbarMsg(response.data.message || "Resume uploaded successfully!");
      setSnackbarSeverity("success");

      const aiResponse = await axios.post(
        "http://127.0.0.1:8000/api/ai-agent/suggest-roles/",
        { resume_text: extractedText },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      setSuggestedRoles(aiResponse.data.roles || []);
      setSkills(aiResponse.data.skills?.join(", ") || "");
      setScore(aiResponse.data.score ?? null);
    } catch (error) {
      setSnackbarMsg(
        "Upload failed: " +
          (error.response?.data?.error || "Unknown error occurred.")
      );
      setSnackbarSeverity("error");
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const cardBg = theme === "light" ? "#f9f9f9" : "#1e1e1e";
  const cardColor = theme === "light" ? "#1a1a1a" : "#f1f1f1";

  return (
    <Box
      sx={{
        px: 3,
        py: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
      <Paper
        elevation={3}
        sx={{
          mb: 5,
          p: 4,
          borderRadius: 4,
          bgcolor: theme === "light" ? "#fefefe" : "#2a2a2a",
          color: theme === "light" ? "#1a1a1a" : "#f1f1f1",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          💼 Discover Where You Belong
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: "1rem" }}>
          Upload your resume and let our AI analyze your experience, extract key skills, recommend ideal roles and provide a resume strength score out of 100 in seconds.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme === "light" ? "#5d6d7e" : "#bdc3c7" }}
        >
          Whether you're pivoting careers, exploring your next opportunity, or
          just curious where you stand this tool will give you clarity backed
          by data and powered by intelligence.
        </Typography>
      </Paper>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: cardBg,
          color: cardColor,
          minWidth: { xs: "100%", sm: "500px" },
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Typography variant="h4" fontWeight={600} mb={3} textAlign="center">
          Upload Your Resume
        </Typography>

        <Box
          {...getRootProps()}
          sx={{
            p: 4,
            border: "2px dashed #bbb",
            borderRadius: 2,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragActive ? "#e3f2fd" : "inherit",
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body1">
            {isDragActive
              ? "Drop it here!"
              : "Drag & drop or click to upload your resume"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            (PDF, DOC, DOCX formats supported)
          </Typography>
        </Box>

        {file && (
          <Paper
            elevation={2}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              bgcolor: theme === "light" ? "#ffffff" : "#2c2c2c",
            }}
          >
            <InsertDriveFileIcon color="primary" />
            <Box>
              <Typography variant="subtitle2">{file.name}</Typography>
              <Typography variant="caption">
                {(file.size / 1024).toFixed(2)} KB
              </Typography>
            </Box>
          </Paper>
        )}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={loading}
            sx={{
              px: 3,
              py: 1.2,
              fontSize: "0.95rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 5,
              background: "linear-gradient(to right, #5e4bff, #2a9df4)",
              color: "#fff",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "#1259c3",
                boxShadow: "0 5px 14px rgba(0, 0, 0, 0.25)",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Resume"
            )}
          </Button>
        </Box>
      </Paper>

      {suggestedRoles.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: cardBg,
            color: cardColor,
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <Typography variant="h5" fontWeight={600} mb={2}>
            🎯 AI Job Fit Insights
          </Typography>
          <Typography variant="body1" mb={2}>
            Based on your resume, you may be a great fit for roles like:
          </Typography>
          {score !== null && (
            <Box sx={{ mt: 1.5, mb: 2 }}>
              <Typography variant="body2" mb={1}>
                Resume Score:
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: "#e0e0e0",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${score}%`,
                    height: "100%",
                    background: "linear-gradient(to right, #00c9ff, #92fe9d)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.8rem",
                  }}
                >
                  {score} / 100
                </Box>
              </Box>
            </Box>
          )}
          <ul>
            {suggestedRoles.map((role, idx) => (
              <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">🔹 {role}</Typography>
              </Box>
            ))}
          </ul>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2">
            Your resume highlights skills like: <strong>{skills}</strong>
          </Typography>
        </Paper>
      )}
      <Button
        variant="contained"
        onClick={() => navigate("/jobs")}
        startIcon={<WorkOutlineIcon />}
        sx={{
          mt: 3,
          px: 3,
          py: 1.2,
          fontSize: "0.95rem",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 5,
          background: "linear-gradient(to right, #5e4bff, #2a9df4)",
          color: "#fff",
          boxShadow: "0 3px 10px rgba(0, 0, 0, 0.15)",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "#1259c3",
            boxShadow: "0 5px 14px rgba(0, 0, 0, 0.25)",
          },
        }}
      >
        Show Me Recommended Jobs
      </Button>
    </Box>
  );
};

export default ResumeUpload;
