import React, { useState, useEffect } from 'react';

const App = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [temperatureUnit, setTemperatureUnit] = useState('C'); // Track temperature unit (Celsius by default)

  // useEffect(() => {
  //   // Fetch data from JSON file
  //   fetch(json)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setCities(data);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  const fetchData = async () => {
    try {
      const data = [
        {
          name: 'New York',
          temperature: 15,
        },
        {
          name: 'Los Angeles',
          temperature: 25,
        },
        {
          name: 'Chicago',
          temperature: 10,
        },
        {
          name: 'Houston',
          temperature: 30,
        },
        {
          name: 'Miami',
          temperature: 28,
        },
      ];
      setCities(data);
      console.log(data);
      // You can further process the data here
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredCities = cities.filter((city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(filteredCities);
  };

  const toggleTemperatureUnit = () => {
    // Toggle temperature unit between Celsius and Fahrenheit
    setTemperatureUnit((unit) => (unit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (temperature) => {
    // Convert temperature based on selected unit
    if (temperatureUnit === 'F') {
      return (temperature * 9) / 5 + 32;
    } else {
      return temperature;
    }
  };

  const addToFavorites = (city) => {
    setFavorites([...favorites, city]);
  };

  const deleteFromFavorites = (city) => {
    const updatedFavorites = favorites.filter(
      (item) => item.name !== city.name
    );
    setFavorites(updatedFavorites);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search cities..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {filteredCities.map((city) => (
          <div key={city.name}>
            <span>
              {city.name}: {convertTemperature(city.temperature)}°
              {temperatureUnit}
            </span>
            <button onClick={toggleTemperatureUnit}>
              Convert to {temperatureUnit === 'C' ? 'Fahrenheit' : 'Celsius'}
            </button>
            <button onClick={() => addToFavorites(city)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
      <div>
        <h2>Favorites</h2>
        {favorites.map((city) => (
          <div key={city.name}>
            <span>
              {city.name}: {convertTemperature(city.temperature)}°
              {temperatureUnit}
            </span>
            <button onClick={() => deleteFromFavorites(city)}>
              Delete from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
