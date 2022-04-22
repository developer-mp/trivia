const initState = {
  options: {
    category: ``,
    difficulty: ``,
    username: ``,
  },
  questions: [],
  index: 0,
  score: 0,
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "CATEGORY":
      return {
        ...state,
        options: {
          ...state.options,
          category: action.category,
        },
      };

    case "DIFFICULTY":
      return {
        ...state,
        options: {
          ...state.options,
          difficulty: action.difficulty,
        },
      };

    case "QUESTIONS":
      return {
        ...state,
        questions: action.questions,
      };

    case "INDEX":
      return {
        ...state,
        index: action.index,
      };

    case "SCORE":
      return {
        ...state,
        score: action.score,
      };

    case "USERNAME":
      return {
        ...state,
        username: action.username,
      };

    default:
      return state;
  }
};

export default Reducer;
