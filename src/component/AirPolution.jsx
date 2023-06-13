import axios from "axios";
import { UserContext } from "./TempApp";
import React, { useEffect, useState, useContext } from "react"


const AirPolution = () => {

    const [airPolutionData, setAirPolutionData] = useState()
    const {apiKey, latitude, longitude} = useContext(UserContext)

    useEffect(() => {
        const apiUrl = "https://api.openweathermap.org/data/2.5/air_pollution?lat="+latitude+"&lon="+longitude+"&appid="+apiKey

        
        axios
        .get(apiUrl)
        .then((response) => setAirPolutionData(response.data))
        .catch((error) => console.log('Error fetching air pollution data:', error))

    },[longitude, latitude, apiKey])


  return (
    <div>
      {airPolutionData ? (
        <>
        <h2>Air Pollution Level</h2>
        <p>Particulate Matter (PM2.5) : {airPolutionData.list[0].components.pm2_5}</p>
        <p>Particulate Matter (PM10): {airPolutionData.list[0].components.pm10}</p>
        </>
      ) : (
        <p>Loading Air Polution Data</p>
      )}
    </div>
  )
};


export default AirPolution;
