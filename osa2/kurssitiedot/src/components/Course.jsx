const Course = ({ course }) => {
  console.log(course)
  return (
    <div>
      <Header header={course.name} />
      <Content content={course} />
      <Total total={course} />
    </div>
  )
}

const Header = ({ header }) => {
  console.log(header)
  return (
    <div>
      <h2>{header}</h2>
    </div>
  )
}

const Content = ({ content }) => {
  console.log(content)
  return (
    <div>
      <ul>
        {content.parts.map(part => 
          <Part key={part.id} part={part} />      
        )}
      </ul>
    </div>
  )
}

const Total = ({total}) => {
  console.log(total)
  const allExercises = total.parts.reduce( (s, p) => s + p.exercises, 0 )
  return (
    <div>
      <h3>Total of {allExercises} exercises</h3>
    </div>
  )
}

const Part = ({ part }) => {
  console.log(part)
  return (
      <li>{part.name} {part.exercises}</li>
  )
}

export default Course