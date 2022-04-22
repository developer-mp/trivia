import './end.css'
import { useSelector, useDispatch } from 'react-redux'

export default function End() {
  const score = useSelector((state) => state.score)
  const username = useSelector((state) => state.username)

  const dispatch = useDispatch()

  const startOver = () => {
    dispatch({
      type: 'CATEGORY',
      category: ``,
    })

    dispatch({
      type: 'DIFFICULTY',
      difficulty: ``,
    })

    dispatch({
      type: 'QUESTIONS',
      questions: [],
    })

    dispatch({
      type: 'INDEX',
      index: 0,
    })

    dispatch({
      type: 'SCORE',
      score: 0,
    })

    dispatch({
      type: 'USERNAME',
      username: ``,
    })
  }

  return (
    <div className="end">
      <h3>
        {username}, your score: {score}
      </h3>
      <button onClick={startOver}>Start over</button>
    </div>
  )
}
