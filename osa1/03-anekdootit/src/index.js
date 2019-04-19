import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({clickHandler, text}) => (
    <button onClick={clickHandler}>
      {text}
    </button>
)

const Header = ({text}) => <h1>{text}</h1>

const Anecdote = ({anecdote, points}) => (
    <div>
        <p>{anecdote}</p>
        <p>Has {points} votes</p>
    </div>
)
const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))
  const [best, setBest] = useState(0)

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected]++
    if (newPoints[selected] >= newPoints[best]) setBest(selected)
    setPoints(newPoints)
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote
        anecdote={props.anecdotes[selected]}
        points={points[selected]}
      />
      <Button
        text="vote"
        clickHandler={() => vote(selected)}
      />
      <Button
        text="next anecdote"
        clickHandler={() => setSelected(Math.floor(props.anecdotes.length * Math.random()))}
      />
      <Header text="Anecdote with most votes"/>
      <Anecdote
        anecdote={props.anecdotes[best]}
        points={points[best]}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)