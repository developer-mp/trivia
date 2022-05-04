import Start from "./Components/start/Start";
import Trivia from "./Components/trivia/Trivia";
import Result from "./Components/result/Result";
import Leaderboard from "./Components/leaderboard/Leaderboard";
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
