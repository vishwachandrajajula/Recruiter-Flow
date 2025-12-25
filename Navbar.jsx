// src/Components/Navbar.jsx
export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Interview Scheduler</h1>
      <div className="space-x-4">
        <a href="#candidates">Candidates</a>
        <a href="#calendar">Calendar</a>
      </div>
    </nav>
  );
}
