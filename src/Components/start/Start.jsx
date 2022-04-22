import "./start.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/Loading";

export default function Start() {
  const [categories, setCategories] = useState("");
  const username = useSelector((state) => state.username);
  const category = useSelector((state) => state.options.category);
  const difficulty = useSelector((state) => state.options.difficulty);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const API_CATEGORIES = `https://opentdb.com/api_category.php`;

      await fetch(API_CATEGORIES)
        .then((res) => res.json())
        .then((data) => {
          setCategories(data.trivia_categories);
        });
    };

    const timer = setTimeout(() => {
      fetchCategories();
    }, 3000);

    return () => clearTimeout(timer);
  }, [setCategories, dispatch]);

  const handleCategory = (e) => {
    dispatch({
      type: "CATEGORY",
      category: e.target.value,
    });
  };

  const handleDifficulty = (e) => {
    dispatch({
      type: "DIFFICULTY",
      difficulty: e.target.value,
    });
  };

  const handleUsername = (e) => {
    dispatch({
      type: "USERNAME",
      username: e.target.value,
    });
  };

  const handleQuestions = (v) => {
    dispatch({
      type: "QUESTIONS",
      questions: v,
    });
  };

  const fetchQuestions = async () => {
    let API_QUESTIONS = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`;

    await fetch(API_QUESTIONS)
      .then((res) => res.json())
      .then((data) => {
        handleQuestions(data.results);
      });

    dispatch({
      type: "INDEX",
      index: 0,
    });

    dispatch({
      type: "SCORE",
      score: 0,
    });
  };

  if (categories) {
    return (
      <div className="start">
        <h1>Trivia</h1>
        <div className="start-wrapper">
          <div className="start-box">
            <li>Select category:</li>
            <li>Select difficulty level:</li>
            <li>Enter your name:</li>
          </div>
          <div className="start-box">
            <li>
              <select required value={category} onChange={handleCategory}>
                <option value="" disabled defaultValue>
                  Select category
                </option>
                {categories &&
                  categories.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </li>
            <li>
              <select value={difficulty} onChange={handleDifficulty}>
                <option value="" disabled defaultValue>
                  Select difficulty
                </option>
                <option value="easy" key="difficulty-easy">
                  Easy
                </option>
                <option value="medium" key="difficulty-medium">
                  Medium
                </option>
                <option value="hard" key="difficulty-hard">
                  Hard
                </option>
              </select>
            </li>
            <li>
              <input onChange={handleUsername} placeholder="Enter your name" />
            </li>
          </div>
        </div>
        <div className="start-button">
          <button
            onClick={fetchQuestions}
            disabled={!category || !difficulty || !username}
          >
            Start
            <span className="start-button-tooltip">
              Please fill out all fields
            </span>
          </button>
        </div>
      </div>
    );
  }
  return <Loading />;
}
