const Course = ({ courses }) => {
    return (
      <>
        {courses.map(map =>
          <div key={map.id}>
            <Header key={map.name} course={map.name} />
            <Content key={map.parts} course={map.parts} />
            <Total key={map.exercises} course={map.parts} />
          </div>
        )}
      </>
    )
  }
  
  const Header = ({ course }) => <h1>{course}</h1>
  
  const Content = ({ course }) => {
    return (
      <div>
        {course.map(map =>
          <Part key={map.name} part={map.name} exercise={map.exercises} />
        )}
      </div>
    )
  }
  
  const Part = ({ part, exercise }) => {
    return (
      <div>
        {part} {exercise}
      </div>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.reduce((total, num) => total + num.exercises, 0)
    return (
      <h4>Number of exercises {total}</h4>
    )
  }

  export default Course