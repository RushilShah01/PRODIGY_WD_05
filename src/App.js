import React, { useState } from "react";
import axios from "axios";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

function App() {
  const [Data, setData] = useState({})
  const [Location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${Location}&units=imperial&appid=83f811b44b88563f80ea9af352251ec8`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('')
    }

  }

  return (
    <div className="app">
      <div className="search">
        <input value={Location} onChange={event => setLocation(event.target.value)} onKeyUp={searchLocation} placeholder="Enter Location" type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{Data.name}</p>
          </div>
          <div className="temp">
            {Data.main ? <h1>{Data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {Data.weather ? <p>{Data.weather[0].main}</p> : null}
          </div>
        </div>
        {Data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {Data.main ? <p className='bold'>{Data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {Data.main ? <p className='bold'>{Data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {Data.wind ? <p className='bold'>{Data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
