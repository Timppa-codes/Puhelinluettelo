import Persons from './Persons'

const Filter = ({ persons, newFilter, handleNewFilter }) => {

    const filter = []
    persons.map((element) => {
      if (element.name.includes(newFilter) && newFilter !== "") {
        filter.push(element)
      }  
    })
    return (
      <>
        <div>
          filter:
          <input
            value={newFilter}
            onChange={handleNewFilter}
          />
          <div>
            <br></br>
          <Persons persons={filter}/>
          </div>
        </div>
        <br></br>
      </>
    )
  }

export default Filter