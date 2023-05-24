import "./leaderboard.css";
import { useDispatch } from "react-redux";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const dbRef = collection(db, "leaderboard");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaderboardData, setLeaderboardData] = useState([]);

  const getResult = async () => {
    const result = await getDocs(dbRef);
    setLeaderboardData(
      result.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    );
  };

  useEffect(() => {
    getResult();
  });

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
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <button onClick={startOver}>Start over</button>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Difficulty</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.difficulty}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
