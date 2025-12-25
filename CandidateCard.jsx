import { useState } from "react";

function CandidateCard({ candidate, onSchedule }) {
  const isEligible = candidate.marks >= 70;
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [showDocs, setShowDocs] = useState(false); // ✅ toggle for document verification

  const zoomLink = "https://zoom.us/j/1234567890?pwd=abcd1234";

  const buildInterview = () => ({
    candidate,
    date,
    time,
    zoomLink,
  });

  const buildMessage = () =>
    `Hello ${candidate.name}, your interview for ${candidate.role} has been scheduled on ${date} at ${time}.
Join Zoom here: ${zoomLink}`;

  const handleWhatsAppSchedule = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }
    const interview = buildInterview();
    onSchedule(interview);

    const scheduleMessage = buildMessage();
    window.open(
      `https://wa.me/${candidate.phone}?text=${encodeURIComponent(scheduleMessage)}`,
      "_blank"
    );
  };

  const handleEmailSchedule = () => {
    if (!date || !time) {
      alert("Please select date and time");
      return;
    }
    const interview = buildInterview();
    onSchedule(interview);

    const scheduleMessage = buildMessage();
    window.location.href = `mailto:${candidate.email}?subject=Interview Scheduled&body=${encodeURIComponent(scheduleMessage)}`;
  };

  const handleRejectionWhatsApp = () => {
    const rejectionMessage = `Hello ${candidate.name}, thank you for applying for ${candidate.role}. Unfortunately, you did not meet the eligibility criteria.`;
    window.open(
      `https://wa.me/${candidate.phone}?text=${encodeURIComponent(rejectionMessage)}`,
      "_blank"
    );
  };

  const handleRejectionEmail = () => {
    const rejectionMessage = `Hello ${candidate.name}, thank you for applying for ${candidate.role}. Unfortunately, you did not meet the eligibility criteria.`;
    window.location.href = `mailto:${candidate.email}?subject=Application Update&body=${encodeURIComponent(rejectionMessage)}`;
  };

  return (
    <div className="card">
      <h2>{candidate.name}</h2>
      <p>{candidate.role}</p>
      <p>Marks: {candidate.marks}</p>
      <p>Phone: {candidate.phone}</p>
      <p>Email: {candidate.email}</p>
      <p className="card-status">
        {isEligible ? "Eligible ✅" : "Not Eligible ❌"}
      </p>

      {isEligible ? (
        <div className="card-actions">
          {/* Date & Time inputs */}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="input"
          />

          {/* Schedule buttons */}
          <button className="btn btn-green" onClick={handleWhatsAppSchedule}>
            Schedule via WhatsApp
          </button>
          <button className="btn btn-blue" onClick={handleEmailSchedule}>
            Schedule via Email
          </button>

          {/* ✅ Document verification toggle */}
          <button
            className="btn btn-yellow"
            onClick={() => setShowDocs(!showDocs)}
          >
            {showDocs ? "Hide Documents" : "Verify Documents"}
          </button>

          {/* Show document links when toggled */}
          {showDocs && (
            <div className="flex flex-col gap-2 mt-2">
              <a
                href="https://drive.google.com/file/d/1g56jW6spJ0Szkdq3Ki-suPkjElzlWF5y/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-purple"
              >
                Academic Document
              </a>
              <a
                href="https://drive.google.com/file/d/1IU0Z3VuYtMgDMEKUaxZMNt1OiwT0sFpw/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-purple"
              >
                Government ID
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="card-actions">
          {/* Rejection buttons */}
          <button className="btn btn-red" onClick={handleRejectionEmail}>
            Send Rejection Email
          </button>
          <button className="btn btn-red" onClick={handleRejectionWhatsApp}>
            Send Rejection WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}

export default CandidateCard;
