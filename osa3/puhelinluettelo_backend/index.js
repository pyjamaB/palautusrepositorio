require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const app = express()

let persons = []
const morgan = require('morgan')
const date = new Date()


app.use(morgan('tiny'))

app.use(express.json())

app.use(express.static('dist'))

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people <br>${date}</p>`
  )
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const minCeiled = Math.ceil(1);
  const maxFloored = Math.floor(1000);
  return String(Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled))
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})