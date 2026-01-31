import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Result</h1>
      <h2>Your Score: {state.score} / 10</h2>

      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/history")}>History</button>
    </div>
  );
}
