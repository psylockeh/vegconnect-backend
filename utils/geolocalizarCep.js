const axios = require("axios");

async function geolocalizarCep(cep) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&region=br&key=${apiKey}`;

  const { data } = await axios.get(url);

  if (data.status !== "OK" || !data.results.length) {
    throw new Error("Não foi possível localizar o CEP.");
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { latitude: lat, longitude: lng };
}

module.exports = geolocalizarCep;
