import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container dark">
      <h1 className="home-title">Quiz App</h1>

      <p className="home-description">
        Test your knowledge with 10 multiple-choice questions.
        Each question has only one correct answer.
      </p>

      <div className="home-buttons">
        <button className="home-btn start" onClick={() => navigate("/quiz")}>
          Start Quiz
        </button>

        <button className="home-btn history" onClick={() => navigate("/history")}>
          View History
        </button>
      </div>
    </div>
  );
}
