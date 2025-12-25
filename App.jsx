// src/App.jsx
import { useState } from "react";
import candidates from "./data/candidates.json";
import Navbar from "./Components/Navbar";
import CandidateCard from "./Components/CandidateCard";
import CalendarView from "./Components/CalendarView";
import Login from "./Pages/Login";
import Schedule from "./Pages/Schedule";
import "./App.css";
import "./styles.css";   // ✅ Correct import

function App() {
  const [interviews, setInterviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState("candidates");

  const handleSchedule = (interview) => {
    setInterviews((prev) => [...prev, interview]);
    setView("schedule");
  };

  const handleClear = (index) => {
    setInterviews((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app-container">
      {/* Navbar always at top */}
      <Navbar />

      {/* Welcome message */}
      <div className="welcome-line">
        Welcome back HR, shall we take the interviews today
      </div>

      {/* Top-right button */}
      <div className="top-actions">
        {view === "candidates" && (
          <button
            className="btn btn-blue"
            onClick={() => setView("schedule")}
          >
            Scheduled Interviews
          </button>
        )}
      </div>

      {/* Candidate grid */}
      {view === "candidates" && (
        <div className="grid-4">
          {candidates.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onSchedule={handleSchedule}
            />
          ))}
        </div>
      )}

      {/* Schedule page */}
      {view === "schedule" && (
        <div>
          <button
            className="btn btn-gray back-btn"
            onClick={() => setView("candidates")}
          >
            ← Back to Candidates
          </button>
          <Schedule interviews={interviews} onClear={handleClear} />
        </div>
      )}

      {/* Calendar view at bottom */}
      <CalendarView interviews={interviews} />
    </div>
  );
}

export default App;
