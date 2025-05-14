const axios = require("axios");

async function geolocalizarCep(cep) {
  try {
    const viacep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { logradouro, bairro, localidade, uf } = viacep.data;

    const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade}, ${uf}`;

    const nominatim = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: enderecoCompleto,
          format: "json",
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          "User-Agent": "VegConnect/1.0",
        },
      }
    );

    if (!nominatim.data[0]) {
      throw new Error("Não foi possível localizar o CEP.");
    }

    const { lat, lon } = nominatim.data[0];
    return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
  } catch (error) {
    console.error("Erro ao geolocalizar:", error.message);
    throw new Error("Não foi possível localizar o CEP.");
  }
}

module.exports = geolocalizarCep;
