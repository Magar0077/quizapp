import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results))
      .catch(() => alert("Failed to load questions"));
  }, []);

  if (!questions.length) {
    return <h2 className="quiz-container dark">Loading questions...</h2>;
  }

  const currentQuestion = questions[currentIndex];

  const options = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort();

  const handleAnswer = (option) => {
    if (selectedAnswer) return;

    setSelectedAnswer(option);

    if (option === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore =
        score + (selectedAnswer === currentQuestion.correct_answer ? 1 : 0);

      const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
      history.push({
        score: finalScore,
        date: new Date().toLocaleString(),
      });
      localStorage.setItem("quizHistory", JSON.stringify(history));

      navigate("/result", { state: { score: finalScore } });
    }
  };

  return (
    <div className="quiz-container dark">
      <h3>
        Question {currentIndex + 1} / {questions.length}
      </h3>

      <p
        dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
      />

      {options.map((option, index) => {
        let btnClass = "option";

        if (selectedAnswer) {
          if (option === currentQuestion.correct_answer) {
            btnClass = "correct";
          } else if (option === selectedAnswer) {
            btnClass = "wrong";
          }
        }

        return (
          <button
            key={index}
            className={btnClass}
            onClick={() => handleAnswer(option)}
            dangerouslySetInnerHTML={{ __html: option }}
          />
        );
      })}

      {selectedAnswer && (
        <button className="next-btn" onClick={handleNext}>
          {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
        </button>
      )}
    </div>
  );
}
