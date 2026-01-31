export default function History() {
  const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

  return (
    <div>
      <h1>Quiz History</h1>

      {history.length === 0 && <p>No quiz attempts found.</p>}

      <ul>
        {history.map((item, index) => (
          <li key={index}>
            Score: {item.score}/10 — {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
