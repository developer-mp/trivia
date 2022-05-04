import "./result.css";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const score = useSelector((state) => state.score);
  const username = useSelector((state) => state.username);
  const difficulty = useSelector((state) => state.options.difficulty);
  // const category = useSelector((state) => state.options.category);
  const dbRef = collection(db, "leaderboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
  };

  const sendResult = () => {
    addDoc(dbRef, {
      date: date(),
      username: username,
      score: score,
      difficulty: difficulty,
      // category: category,
    }).then(() => {
      navigate("/leaderboard");
    });
  };

  const startOver = () => {
    navigate("/");
    dispatch({
      type: "CATEGORY",
      category: ``,
    });

    dispatch({
      type: "DIFFICULTY",
      difficulty: ``,
    });

    dispatch({
      type: "QUESTIONS",
      questions: [],
    });

    dispatch({
      type: "INDEX",
      index: 0,
    });

    dispatch({
      type: "SCORE",
      score: 0,
    });

    dispatch({
      type: "USERNAME",
      username: ``,
    });
  };

  return (
    <div className="result">
      <h3>
        {username}, your score: {score}
      </h3>
      <button className="result-btn-startover" onClick={startOver}>
        Start over
      </button>
      <button className="result-btn-leaderboard" onClick={sendResult}>
        Submit score
      </button>
    </div>
  );
};

export default Result;
