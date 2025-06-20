import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import React from "react";
import UserLogin from "./components/user/UserLogin";
import UserSignup from "./components/user/UserSignup";
import Jobs from "./components/jobs/Jobs";
import JobScore from "./components/jobs/JobScore";
import ResumeUpload from "./components/resume/ResumeUpload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './components/layout/theme.css'
import { UserProvider } from "./components/layout/UserContext";
import './index.css'
import TailorResume from "./components/resume/TailorResume";


function App() {
  return (
    <Router>
      <React.Fragment>
      <UserProvider>
        <Header />
        <div id="stars"></div>
        <main>
          <Routes>
            <Route path="/signup" element={<UserSignup/>} />
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/jobs" element={<Jobs/>} />
            <Route path="/jobscore" element={<JobScore/>} />
            <Route path="/" element={<UserLogin/>} />
            <Route path="/resume" element={<ResumeUpload />} />
            <Route path="/tailor" element={<TailorResume/>} />
          </Routes>
        </main>
        <Footer />
        </UserProvider>
      </React.Fragment>
    </Router>
  );
}

export default App;
