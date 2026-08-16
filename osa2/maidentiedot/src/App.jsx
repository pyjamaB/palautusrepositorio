import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt='flag'/>
    </div>
  )
}

const CountryList = ({ country, countries, onChooseCountry }) => {
  if (countries.length === 1) {
    return (
      <Country key={country.name.common} country={country} />
    )
  } else {
    return (
      <li>{country.name.common} <button onClick={() => onChooseCountry(country.name.common)}>{'View'}</button></li>
    )
    console.log('country list', country.name.common)
  }
  
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect run, country is now', value)

    if (value) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase())))
          console.log(countries)
        })
    } else {
      setCountries([])
    }
  }, [value])

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const chooseCountry = (name) => {
    setValue(name)
  }

  return (
    <div>
        country: <input value={value} onChange={handleChange} />
        <ul>
          {countries.length > 0 && countries.length < 10 ? 
            countries.map(country => <CountryList key={country.name.common} 
              country={country} countries={countries} onChooseCountry={() => chooseCountry(country.name.common)}/>) : 
            <p>Too many matches, specify another filter</p>
          }
        </ul>
    </div>
  )
  console.log(countries)
}

export default App