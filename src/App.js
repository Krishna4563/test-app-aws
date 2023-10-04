import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ea5afff881bb96ec71d2c441f9511e4d`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>

      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? (
            <h1>{Math.floor((data.main.temp.toFixed() - 32) / 1.8)}°C</h1>
          ) : null}
        </div>
      </div>

      <div className="description">
        {data.weather ? (
          <p className="desc-text">{data.weather[0].main}</p>
        ) : null}
      </div>

      {data.name !== undefined && (
        <div className="bottom">
          <div className="feels">
            {data.main ? (
              <p className="bold">
                {Math.floor((data.main.feels_like.toFixed() - 32) / 1.8)}°C
              </p>
            ) : null}
            <p>Feels like</p>
          </div>

          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>

          <div className="wind">
            {data.wind ? (
              <p className="bold">{data.wind.speed.toFixed()} MPH</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
