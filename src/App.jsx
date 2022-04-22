import { useSelector } from "react-redux";
import Start from "./Components/start/Start";
import Trivia from "./Components/trivia/Trivia";
import End from "./Components/end/End";

export default function App() {
  const questions = useSelector((state) => state.questions);
  const index = useSelector((state) => state.index);

  if (!questions.length) {
    return <Start />;
  } else if (questions.length && index + 1 <= questions.length) {
    return <Trivia />;
  } else {
    return <End />;
  }
}
