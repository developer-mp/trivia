import "./trivia.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Result from "../result/Result";

const decodeHTML = function (html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const Trivia = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [choices, setChoices] = useState([]);
  const score = useSelector((state) => state.score);
  const username = useSelector((state) => state.username);
  const encodedQuestions = useSelector((state) => state.questions);
  const index = useSelector((state) => state.index);
  const dispatch = useDispatch();

  useEffect(() => {
    const decodedQuestions = encodedQuestions.map((q) => {
      return {
        ...q,
        question: decodeHTML(q.question),
        correct_answer: decodeHTML(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map((a) => decodeHTML(a)),
      };
    });

    setQuestions(decodedQuestions);
  }, [encodedQuestions]);

  const question = questions[index];
  const answer = question && question.correct_answer;

  useEffect(() => {
    if (!question) {
      return;
    }
    let options = [...question.incorrect_answers, question.correct_answer];
    let optionsShuffled = options.sort(() => Math.random() - 0.5);
    setChoices(optionsShuffled);
  }, [question]);

  const handleAnswer = (e) => {
    setSelectedAnswer(e.target.textContent);

    if (e.target.textContent === answer) {
      setTimeout(() => {
        dispatch({
          type: "SCORE",
          score: score + 1,
        });
      }, 2000);
    }

    if (index <= questions.length) {
      setTimeout(() => {
        setSelectedAnswer(null);

        dispatch({
          type: "INDEX",
          index: index + 1,
        });
      }, 3000);
    }
  };

  const getAnswerClass = (a) => {
    if (a === selectedAnswer && a === answer) {
      return `correct`;
    }

    if (a === selectedAnswer && a !== answer) {
      return `wrong`;
    } else {
      return `trivia-answer`;
    }
  };

  if (questions.length && index + 1 <= questions.length) {
    return (
      <div className="trivia">
        <div className="trivia-profile">
          <div>Welcome to the game, {username}! </div>
          <div>
            Your score: {score} / {questions.length}
          </div>
        </div>
        <div className="trivia-questions">
          <p>Question {index + 1}</p>
          <h3>{question.question}</h3>
          <div className="trivia-answer-wrapper">
            {choices.map((a, i) => (
              <div key={i} onClick={handleAnswer} className={getAnswerClass(a)}>
                {a}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return <Result />;
};

export default Trivia;
