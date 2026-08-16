import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'
import Confirmation from './components/Confirmation'

const Filter = (props) => {
  return (
    <div>filter shown with: <input 
        value={props.value}
          onChange={props.onChange}
      /></div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
        <div>name: <input
          value={props.name}
          onChange={props.onNameChange}
        /></div>
        <div>number: <input
          value={props.number}
          onChange={props.onNumberChange}
        /></div>
        <button type="submit">add</button>
      </form>
  )
}

const Persons = (props) => {
  return (
    <li> {props.name} {props.number}
      <button onClick={props.onDelete}>delete</button>
    </li>
)}

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState(
    ''
  ) 

  const [newNumber, setNewNumber] = useState(
    ''
  )

  const [newSearch, setNewSearch] = useState(
    ''
  )

  const [errorMessage, setErrorMessage] = useState(null)

  const [confirmationMessage, setConfirmationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    const nameSearch = persons.find(person => person.name === newName)

    if (nameSearch) {
      if (window.confirm(`${newName} is already added to phonebook, replace the number with a new one?`)) {
        personService
          .update(nameSearch.id, nameObject)
          .then(response => 
            {setPersons(persons.map(person => person.id !== nameSearch.id ? person : response.data))
              setConfirmationMessage(
              `The number for ${newName} was updated`
            )
            setTimeout(() => {
              setConfirmationMessage(null)
            }, 5000)
          
            })
            .catch(error => {
              setErrorMessage(
                `Information of ${newName} has already been removed from server`
              )
              setConfirmationMessage(null)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== nameSearch.id))
            })
            setConfirmationMessage(
              `The number for ${newName} was updated`
            )
            setTimeout(() => {
              setConfirmationMessage(null)
            }, 5000)
          }
            setNewName('')
            setNewNumber('')
          }
        else { personService
                .create(nameObject)
                .then(response => {
                  setPersons(persons.concat(response.data))
                setNewName('')
                setNewNumber('')
                setConfirmationMessage(
                    `${newName} was added`
                  )
                  setTimeout(() => {
                    setConfirmationMessage(null)
                  }, 5000)
        
                })
                
                  
          }
  }

  const removeName = (id) => {

    const person = persons.find(person => person.id === id)

    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        setConfirmationMessage(
          `${person.name} was removed from server`
        )
        setTimeout(() => {
          setConfirmationMessage(null)
        }, 5000)
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const personsToShow = newSearch.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Confirmation message={confirmationMessage} />
      <Filter onChange={handleSearch} value={newSearch} />
      <h3>Add a new person</h3>
      <PersonForm onSubmit={addName} name={newName}
        onNameChange={handleNameChange} number={newNumber}
        onNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person =>
          <Persons  key={person.name}
            number={person.number} name={person.name} 
            onDelete={() => {if (window.confirm(`Do you want to delete ${person.name}?`)) {removeName(person.id)}}}/>
        )}
      </ul>
    </div>
  )

}

export default App
