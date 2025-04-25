import { useState } from "react";
import "./App.css";

function App() {
  let [city, setCity] = useState("");
  let [wDetails, setWDetails] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let today = new Date().toDateString();

  let getData = (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6326578d51efdbd1624a085f60c0d559&units=metric`
    )
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWDetails(undefined);
        } else {
          setWDetails(finalRes);
        }
        setIsLoading(false);
      });
    
    setCity("");
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gradient-to-r from-blue-700 to-cyan-300 p-4 ">
      <h1 className="text-4xl font-bold text-white mb-5 text-center mt-6">
        Simple Weather App
      </h1>
      <p className="text-white text-lg mb-4 font-semibold">{today}</p>
      
      <form onSubmit={getData} className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-72 h-12 px-4 rounded-lg text-black outline-none"
          placeholder="Enter City Name"
        />
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-gray-200 transition">
          Search
        </button>
      </form>
      
      <div className="w-full max-w-sm mt-6 p-6 bg-white shadow-lg rounded-lg text-center">
        {isLoading ? (
           <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhl08kpLO68QxV3ht5mN7p1Su7wk3RY8lPOhrQv2JrhkeoZzf02cIQQ6MdV18M33yZcoqpHsbKZ__Yju086OCZFFM3zwhUO2xExkJYOk7ljqNmZ5fz-vjO5TL5b66M4dptFJ1nU/s1600/11-03+~+GIF+~+Please+Wait.gif"
           width={80}
            className="mx-auto"
         />
        ) : wDetails !== undefined ? (
          <>
            <h3 className="text-2xl font-bold">
              {wDetails.name}, {wDetails.sys.country}
            </h3>
            <h2 className="text-3xl font-semibold text-blue-500">{wDetails.main.temp}°C</h2>
            <img
              src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`}
              width={80}
              className="mx-auto"
            />
            {console.log(wDetails)}
            <p className="text-xl text-gray-700 font-semibold">
              {wDetails.weather[0].description}
            </p>
            <div className="flex justify-evenly items-center">
              <div className="flex flex-col mt-4 font-bold text-1xl p-1">
              <p className="flex justify-center flex-col  font-semibold">{wDetails.main.humidity +"%" 
              }</p>
              <h1> Humidity</h1>
              </div>
              <div className="flex flex-col mt-4 font-bold text-1xl p-1">
              <p className="flex justify-center flex-col  font-semibold">{wDetails.wind.speed+"km/h"
              }</p>
              <h1>Wind Speed</h1>
              </div>

            </div>
          </>
        ) : (
          <p className="text-red-500 font-semibold">No City Found</p>
        )}
      </div>
    </div>
  );
}

export default App;
