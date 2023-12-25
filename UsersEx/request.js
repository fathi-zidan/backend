const url = 'https://catfact.ninja/fact';
const request = require('request');

const fetchUsingRequest = function () {
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log('Error fetching Chuck Norris joke:', error.message);
        } else {
            const fact = response.body.fact;
            console.log("Cat Fact : ", fact + '\n')
        }
    })

}
fetchUsingRequest();

// using axios 
const axios = require('axios');
const secondUrl = 'https://api.chucknorris.io/jokes/random';

const fetchUsingAxios = async function () {
    try {
        const response = await axios.get(secondUrl);
        const data = response.data.value;
        console.log("chucknorris joke :", data + '\n');
    } catch (err) {
        console.log(`There was an Error!${err}`);
    }

}
fetchUsingAxios()

// using node-fetch
const fetch = require('node-fetch');
const fetchUsingNodeFetch = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json(); // Parse JSON response
        console.log("Cat Fact using node-fetch:", data.fact + '\n');
    } catch (err) {
        console.log(`There was an Error! ${err}`);
    }

}
fetchUsingNodeFetch();