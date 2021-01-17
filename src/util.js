import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet';


const casesTypecolors = {
    cases: {
        // hex: "#CC1034",
        hex : '#fc6203',
        multiplier: 800,

      },

      recovered: {
        hex: "#7dd71d",
        multiplier: 1200,

      },

      deaths: {
        hex: "#fc0303",
        multiplier: 2000,

      },
};


export const sortData = (data) => {
    const sortedData = [...data]

    return  sortedData.sort((a,b) => a.cases > b.cases? -1 : 1 );
};


export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "0";


// Drow circles on the map with intractive tooltip

export const showDataOnMap = (data, casesType = 'cases') =>
    data.map((country) => (
        <Circle center={[country.countryInfo.lat, country.countryInfo.long]} fillOpacity={0.4}
                
            pathOptions={{color: casesTypecolors[casesType].hex,
                          fillColor: casesTypecolors[casesType].hex}}
        
                radius={
                    Math.sqrt(country[casesType] / 10) * casesTypecolors[casesType].multiplier
                    
                }
             >
                    <Popup>
                       <div className='info-container'>
                           <div className='info-flag' style={{ backgroundImage: `url(${country.countryInfo.flag})`}} />
                           <div className='info-name'>{country.country}</div>
                           <div className='info-confirmed'>Cases: {numeral(country.cases).format("0,0")}</div>
                           <div className='info-recovered'>Recovered: {numeral(country.recovered).format("0,0")}</div>
                           <div className='info-deaths'>deaths: {numeral(country.deaths).format("0,0")}</div>
                          
                       </div>
                    </Popup>

        </Circle>
    )) 
