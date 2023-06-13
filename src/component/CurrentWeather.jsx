import React, { useEffect, useState, useContext } from "react"
import { UserContext } from "./TempApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStreetView} from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosError } from "axios";



const CurrentWeather = () => {

    const [weatherData, setWeatherData] = useState();
    
    const {cityName, apiKey} = useContext(UserContext);


    useEffect(() => {

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+apiKey+"&units=metric"

        axios
        .get(url)
        .then(response => setWeatherData(response.data))
        .catch((error) => console.log("I screwed up"))

    },[cityName, apiKey])

   


  return (
    
    <div>

    {weatherData ? (
        <>
       <div className="info">
        <h1 className="loaction">
        <FontAwesomeIcon icon={faStreetView} size="2xl"/>
        <span className="citySpan">{weatherData.name}</span>
        </h1>
        <h2 className="temp">
           { weatherData.main.temp} °C 
           <div>{weatherData.weather[0].description}</div>
        </h2>
        <h3 className="tempmin-max"> Min : {weatherData.main.temp_min} | Max :{weatherData.main.temp_max}</h3> 
    </div>
    <div className="tableData">
    <table>
        <tbody>
        <tr>
            
            <th>Wind</th>
            <th>Humidity</th>
            <th>Feels Like</th>
        </tr>
        <tr>
            
            <td>{weatherData?.wind?.speed}</td>
            <td>{weatherData?.main?.humidity}</td>
            <td>{weatherData?.main?.feels_like}</td>
        </tr>
        </tbody>
    </table>
    <table>
    <tbody>
        <tr>
            
            <th>Visiblity</th>
            <th>Pressure</th>
            <th></th>
        </tr>
        <tr>
            
            <td>{weatherData?.visibility}</td>
            <td>{weatherData?.main?.pressure}</td>
            <td></td>
        </tr>
        </tbody>
    </table>
    </div> 
    </>
    ) : (
        <p>Current Weather Data is loading</p>
    )}

    </div>
   
  )
};


export default CurrentWeather;
