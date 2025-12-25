// src/Components/CalendarView.jsx
export default function CalendarView({ interviews }) {
  return (
    <div id="calendar" className="mt-6 p-4 bg-gray-100 rounded">
      <h2 className="font-bold text-lg mb-2">Scheduled Interviews</h2>
      {interviews.length === 0 ? (
        <p>No interviews scheduled yet.</p>
      ) : (
        <ul>
          {interviews.map((i, idx) => (
            <li key={idx} className="mb-2">
              📅 {i.name} ({i.role}) — <a href={i.link}>{i.link}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
