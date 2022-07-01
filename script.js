const APIKEY = 'at_NJOdDCkVhPLFy6r8jVDHyangaA9Ff'
const api_url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_NJOdDCkVhPLFy6r8jVDHyangaA9Ff&ipAddress=192.212.174.101'
//TODO: hide apikey


const enteredText = document.querySelector('#searchField');
const searchBtn = document.querySelector('#search_btn');
const currentIp = document.querySelector('#ip-address');
const currentLocation= document.querySelector('#location');
const currentTimeZone = document.querySelector('#timezone');
const currentIsp = document.querySelector('#isp');

const renderIpDetails = async (ipData) => {
    const ipDetails = await ipData;
    currentIp.textContent = `${ipDetails.ip}`
    currentLocation.textContent = `${ipDetails.location.city}, ${ipDetails.location.region} ${ipDetails.location.postalCode}, ${ipDetails.location.country}`
    currentTimeZone.textContent = `${ipDetails.location.timezone}`
    currentIsp.textContent = `${ipDetails.isp}`
    console.log(ipDetails)
    const coordinates = {
        lat: ipDetails.location.lat,
        lng: ipDetails.location.lng
    }
    console.log(coordinates);
    updateMap(coordinates)
    // return coordinates;
    
    //TODO: figue it out how to get timezone, maybe from webbrowser?
}

const updateMap = (coordinates) =>{
    map.setView(coordinates, 13);
    L.marker(coordinates).addTo(map);

    //TODO: geolocation on start
}

const getIpDetails = async (newIP) => {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_NJOdDCkVhPLFy6r8jVDHyangaA9Ff&ipAddress=${newIP}`);
    const ipData = await response.json();

    renderIpDetails(ipData);
}



//initialization leaftmaps
var map = L.map('map').setView([37.40599, -122.078514], 15);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

var marker = L.marker([37.40599, -122.078514]).addTo(map);



searchBtn.addEventListener('click', event => {
    event.preventDefault();
    getIpDetails(enteredText.value);
     
})

// getIP();

//ip do testu 192.212.1714.01 i 8.8.8.8 to google