const Persons = ({ persons, removeContact }) => {
    return (
        <ul>
            {persons.map(map =>
                <Person removeContact={removeContact} id={map.id} key={map.name} person={map.name} number={map.number} />
            )}
        </ul>
    )
}

const Person = ({ person, number, id, removeContact }) => {
    return (

        <li>
            <button id={person} value={id} onClick={removeContact}>delete</button>
            {person} {number}
        </li>
    )
}

export default Persons