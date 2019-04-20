import React, {useState, useEffect} from 'react';
import Axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('finland')

  useEffect(() => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(`Loaded ${countries.length} countries`)
        setCountries(response.data)
      })
  }, [])

  console.log(`Found ${countries.length} countries`)
  
  return (
    <div>
    <Filter filter={filter} setFilter={setFilter}/>
    <Content countries={countries} filter={filter} setFilter={setFilter}/>
    </div>
    )
}

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <form>
      Find countries 
      <input
        value={filter}
        onChange={handleFilterChange}
      />
    </form>
  )
}

const Content = ({countries, filter, setFilter}) => {
  const toShow = countries.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0)
  console.log(`Found ${toShow.length} countries matching filter ${filter.toLowerCase()}`)
  if (toShow.length === 0)
    return (
      countries.length === 0
        ? <p>Connecting to server, please wait</p>
        : <p>No matches, please try another filter</p>
    )
  if (toShow.length === 1)
    return (
      <Country country={toShow[0]}/>
    )
  
  if (toShow.length <= 10)
    return (
      toShow.map(country => <CountryRow key={country.alpha3Code} country={country} setFilter={setFilter}/>)
    )

  return (
    filter.length === 0
    ? <p>Search for a country to begin</p>
    : <p>Too many matches, please try another filter</p>
  )
}

const CountryRow = ({country, setFilter}) => {
  //const clickHandler () => 

  return (
    <p>
      {country.name}
      <button onClick={() => setFilter(country.name)}>
        show
      </button>
    </p>
  )
}

const Country = ({country}) => {
  console.log(`Found ${country.name}`)
  return(
    <div>
      <h2>{country.name}</h2>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>
      <h3>Languages</h3>
      <ul>
      {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height='100' alt={country.alpha3Code}/>
      <Weather city={country.capital}/>
    </div>
  )
}

const Weather = ({city}) => {
  const [weather, setWeather] = useState({condition: {}})
  console.log(`Looking for weather in ${city}`)

  useEffect(() => {
    Axios
      .get(`http://api.apixu.com/v1/current.json?key=a9fd88cdb1334b2080e145345192004&q=${city}`)
      .then(response => {
        setWeather(response.data.current)
        console.log(`Loaded weather in ${city}`)
      })
  }, [])

  console.log(weather)

  return (
    <div>
      <h3>Weather in {city}</h3>
      <p>Temperature: {weather.temp_c} °C</p>
      <p>Wind: {Math.round(weather.wind_kph / 3.6 * 100) / 100} m/s</p>
      <img src={weather.condition.icon} alt={city}/>
    </div>
  )
}

export default App