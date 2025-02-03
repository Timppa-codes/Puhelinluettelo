import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import contactService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [confirmMessage, setConfirmMessage] = useState('')

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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        //käyttäjä valitsee ok. Haetaan tiedot tieokannasta
        contactService
          .getAll()
          .then(response => {
            //hakeminen onnistui, joten käydään läpi kontaktit ja jos löytyy vastaavuus
            //tulostetaan löydetyn nimen sen hetkinen id muuttujaan updateid
            response.data.map(map => {
              if (map.name === newName) {
                const updateid = map.id
                contactService
                  //päivitetään kontakti tietokantaan
                  .update(updateid, newContact)
                  .then(response => {
                    //onnistunut numeronpäivitys asetetaan confim viestiksi
                    setConfirmMessage(
                      `Contact ${newName} phonenumber ${newNumber} updated from server`
                    )
                    setTimeout(() => {
                      setConfirmMessage(null)
                    }, 3000)
                    ////////////////
                    //asetetaan nimi ja numero kentät tyhjäksi
                    setNewName('')
                    setNewNumber('')
                    //then saatu vastaus onnistumisesta
                    //ladataan uusin versio tiedostosta palvelimelta
                    contactService
                      .getAll()
                      .then(response => {
                        setPersons(response.data)
                      })
                  })
              }
            })
          })
        //else if käyttäjä valitsee olla päivittämättä kontaktia
      } else {
        setNewName('')
        setNewNumber('')
      }
      //else kontakti on uusi
    } else {
      setPersons(persons.concat(newContact))
      setNewName('')
      setNewNumber('')
      //luodaan uusi kontakti myös palvelimelle
      contactService
        .create(newContact)
        .then(response => {
          //asetetaan confirm viestiksi onnistunut lisäys
          setConfirmMessage(
            `Contact ${newName} added from server`
          )
          setTimeout(() => {
            setConfirmMessage(null)
          }, 2000)
          //then saatu vastaus onnistumisesta
          //ladataan uusin versio tiedostosta palvelimelta
          contactService
            .getAll()
            .then(response => {
              setPersons(response.data)
            })
        })
    }
  }

  const removeContact = (event) => {
    //kysytään vielä varmistus ennen poistamista
    if (window.confirm(`Delete ${event.target.id} ?`)) {
      //pyydetään poistamaan tietyn nappulan id:n mukainen kontakti
      contactService
        .remove(event.target.value)
        .then(response => {
          //asetetaan confirm viestiksi onnistunut poisto
          setConfirmMessage(
            `Contact ${event.target.id} removed from server`
          )
          setTimeout(() => {
            setConfirmMessage(null)
          }, 3000)
          //then saatu vastaus onnistumisesta
          //ladataan uusin versio tiedostosta palvelimelta
          contactService
            .getAll()
            .then(response => {
              setPersons(response.data)
            })
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
      <Notification message={confirmMessage}/>
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
    <div className="confirm">
      {message}
    </div>
  )
}

export default App