import React from 'react'

const Course = ({course}) => {
  return(
  <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
  </div>
  )
}

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
  )
}

const Content = ({course}) => {
  const rows = () => 
      course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)
  
  return(
      rows()
  )
}

const Total = (props) => {
  const add = (accumulator, a) => accumulator + a
  const sum = props.course.parts.map(part => part.exercises).reduce(add)

  return (
      <p>yhteensä {sum} tehtävää</p>
  )
}

export default Course