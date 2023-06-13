import React, { useEffect, useState, createContext } from "react";
import AirPolution from "./AirPolution";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const UserContext = createContext();

const TempApp = () => {

    const [search, setSearch] = useState("Mumbai")
    const [cityName, setCityName] = useState("Mumbai")
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    const [apiKey] = useState( "7a32b7adfc5c445b589ee707eeff4c90")
    


    useEffect(() => {

        const getData = async () => {

               //Geocoding Api
               const geocodingUrl = "https://api.openweathermap.org/geo/1.0/direct?q="+cityName+"&limit=5&appid="+apiKey
               const response3 = await fetch(geocodingUrl);
               const geoCodResJson = await response3.json()
               const lati = await geoCodResJson[0]?.lat
               setLatitude(lati)
               const longi = await geoCodResJson[0]?.lon
               setLongitude(longi);
               //state updates are asynchronous   
           }
           getData()
       }, [cityName, apiKey])  
    

  return (
    <>
    <UserContext.Provider value={{cityName, longitude, latitude, apiKey}}>
    <div className="box">
    <div className="inputData">
        <input 
        className="inputField"
        type="text" 
        name="cityInput" 
        placeholder="City Name"
         
        onChange={(e) => {
            setSearch(e.target.value)
        }}
        onKeyDown={(event) => {
            if(event.key === "Enter") {
                setCityName(search)
            }
        }}
        />
    </div>

    <CurrentWeather />

    <Forecast />

    {longitude ? (
    <AirPolution/>
        ) : (
            <p>I did not get the data</p>
        )}
      
    </div>
    </UserContext.Provider>
    </>
  )
};


export {UserContext};

export default TempApp;
