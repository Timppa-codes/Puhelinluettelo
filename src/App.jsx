import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [confimMessage, setConfirmMessage] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const newContact = {
      name: newName,
      number: newNumber
    }
    if (persons.find((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      contactService
        .create(newContact)
        .then(promise => {
          setPersons(persons.concat(promise.data))
          setNewName('')
          setNewNumber('')
          //asetetaan confirm viestiksi onnistunut lisäys
          setConfirmMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setConfirmMessage(null)
          }, 2000)
        })
    }
  }

  const removeContact = (event) => {
    if (window.confirm(`Delete ${event.target.id} ?`)) {
      contactService
        .remove(event.target.value)
        .then(() => {
          setPersons(persons.filter(contact => contact.name !== event.target.id))
          //asetetaan confirm viestiksi onnistunut poisto
          setConfirmMessage(
            `Deleted ${event.target.id}`
          )
          setTimeout(() => {
            setConfirmMessage(null)
          }, 3000)
        })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Notification message={confimMessage} />
      <h2>Phonebook</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addContact={addContact}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        removeContact={removeContact}
      />
    </div>
  )

}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='confirm'>
      {message}
    </div>
  )
}

export default App