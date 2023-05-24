import Start from "./Pages/start/Start";
import Trivia from "./Pages/trivia/Trivia";
import Result from "./Pages/trivia/Trivia";
import Leaderboard from "./Pages/leaderboard/Leaderboard";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/trivia" element={<Trivia />} />
        <Route exact path="/result" element={<Result />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
