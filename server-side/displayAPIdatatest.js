const axios = require('axios');
const fs = require('fs');
const options = {
  method: 'GET',
  url: 'https://public-bathrooms.p.rapidapi.com/location',
  params: {
    lat: '42',
    lng: '-74.005974',
    page: '1',
    per_page: '10',
    offset: '0',
    ada: 'false',
    unisex: 'false'
  },
  headers: {
    'X-RapidAPI-Key': '0ba52e89e7msh6aa06d6b9d1c96ap159478jsn64be0573d843',
    'X-RapidAPI-Host': 'public-bathrooms.p.rapidapi.com'
  }
};
/*
async function fetchData() {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchData();
*/
/*
async function fetchData() {
  try {
    const response = await axios.request(options);
    const jsonData = JSON.stringify(response.data, null, 2);

    // Write the data to db.json
    fs.writeFileSync('db.json', jsonData);

    console.log('Data written to db.json successfully!');
  } catch (error) {
    console.error(error);
  }
}

fetchData();
*/
async function fetchData() {
  try {
    const response = await axios.request(options);
    const latLngData = response.data.map(item => ({
      lat: item.latitude,
      lng: item.longitude
    }));
    const jsonData = JSON.stringify(latLngData, null, 2);

    // Write the data to db.json
    fs.writeFileSync('db2.json', jsonData);

    console.log('Data (long and lat) written to db2.json successfully!');
  } catch (error) {
    console.error(error);
  }
}

fetchData();