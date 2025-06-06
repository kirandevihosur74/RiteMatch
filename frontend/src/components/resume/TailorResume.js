import React, { useCallback, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useDropzone } from "react-dropzone";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const TailorResume = () => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tailoredResume, setTailoredResume] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);

      const formData = new FormData();
      formData.append("resume", selectedFile);
      const token = localStorage.getItem("token");

      try {
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
        setResumeText(response.data.resume_text || "");
      } catch (err) {
        alert("Resume text extraction failed.");
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
    multiple: false,
  });

  const handleTailor = async () => {
    if (!resumeText || !jobDescription) {
      alert("Please upload a resume and paste a job description.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tailor-resume/",
        {
          resume_text: resumeText,
          job_description: jobDescription,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setTailoredResume(response.data.tailored_resume || "");
    } catch (error) {
      alert("Failed to tailor resume.");
    } finally {
      setLoading(false);
    }
  };

  const downloadAsDocx = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: tailoredResume.split("\n").map(
            (line) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: line,
                    font: "Arial",
                    size: 20, // 10pt (1pt = 2 half-points)
                  }),
                ],
              })
          ),
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "Tailored_Resume.docx");
    });
  };


  const downloadAsPdf = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "letter",
      compress: true,
    });

    const lines = doc.splitTextToSize(tailoredResume, 550);
    doc.setFont("Times-Roman");
    doc.setFontSize(10); // 10pt
    doc.text(lines, 40, 50, { maxWidth: 550 });
    doc.save("Tailored_Resume.pdf");
  };

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        ✨ Tailor Your Resume
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Paste or upload your resume and job description to generate a tailored
        version — instantly preview and download it!
      </Typography>

      {/* Resume Upload */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Upload Resume
        </Typography>

        <Box sx={{ mt: 2 }}>
          {file ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InsertDriveFileIcon sx={{ mr: 1 }} />
              <Typography variant="body2">{file.name}</Typography>
              <IconButton
                onClick={() => {
                  setFile(null);
                  setResumeText("");
                }}
                size="small"
                sx={{ ml: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ) : (
            <Box
              {...getRootProps()}
              sx={{
                mt: 2,
                p: 3,
                border: "2px dashed #aaa",
                borderRadius: 2,
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
              }}
            >
              <input {...getInputProps()} />
              <CloudUploadIcon sx={{ fontSize: 48, mb: 1 }} />
              <Typography variant="body1">
                Drag & drop or click to upload your resume
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (PDF, DOC, DOCX supported)
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Job Description Input */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Paste Job Description
        </Typography>
        <TextField
          multiline
          minRows={6}
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Paper>

      {/* Tailor Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Button
          onClick={handleTailor}
          disabled={loading}
          sx={{
            px: 4,
            py: 1.4,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 5,
            background:
              "linear-gradient(to right,rgb(134, 179, 178),rgb(116, 118, 120))",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
            "&:hover": {
              background:
                "linear-gradient(to right, #2a9df4,rgb(127, 126, 130))",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
            },
            "&:disabled": {
              opacity: 0.6,
              cursor: "not-allowed",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={22} sx={{ color: "#fff" }} />
          ) : (
            "Tailor Resume"
          )}
        </Button>
      </Box>

      {/* Preview Panels */}
      <Box sx={{ display: "flex", gap: 4 }}>
        <Paper
          elevation={2}
          sx={{ p: 3, flex: 1, borderRadius: 3, backgroundColor: "#fdfdfd" }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Original Resume Preview
          </Typography>
          <Box
            sx={{
              minHeight: 200,
              bgcolor: "#fafafa",
              p: 2,
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {resumeText || "Upload a resume to see the content here."}
            </Typography>
          </Box>
        </Paper>

        <Paper
          elevation={2}
          sx={{ p: 3, flex: 1, borderRadius: 3, backgroundColor: "#fdfdfd" }}
        >
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Tailored Resume Preview
          </Typography>
          <Box
            sx={{
              minHeight: 200,
              bgcolor: "#f4faff",
              p: 2,
              whiteSpace: "pre-wrap",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {tailoredResume ||
                "Tailored version will appear here after processing."}
            </Typography>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          color="primary"
          disabled={!tailoredResume}
          onClick={downloadAsDocx}
        >
          Download as DOCX
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!tailoredResume}
          onClick={downloadAsPdf}
        >
          Download as PDF
        </Button>
      </Box>
    </Box>
  );
};

export default TailorResume;
