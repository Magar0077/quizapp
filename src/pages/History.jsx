import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="history-container dark">
      <h1>Quiz History</h1>
      <ul>
        {history.length === 0 && <li>No history found.</li>}
        {history.map((item, index) => (
          <li key={index}>
            Score: {item.score} / 10 | Date: {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
