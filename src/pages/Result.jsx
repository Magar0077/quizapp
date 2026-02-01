import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const score = state?.score || 0;

  return (
    <div className="quiz-container dark">
      <h2>Your Score: {score}</h2>
      <button className="next-btn" onClick={() => navigate("/")}>
        Go Home
      </button>
      <button className="home-btn history" onClick={() => navigate("/history")}>
        View History
      </button>
    </div>
  );
}
