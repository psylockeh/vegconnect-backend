const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/google/places", async (req, res) => {
  const { lat, lng, termo = "vegan restaurant" } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!lat || !lng || !apiKey) {
    return res.status(400).json({ erro: "Parâmetros obrigatórios ausentes." });
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: termo,
          location: `${lat},${lng}`,
          radius: 3000,
          key: apiKey,
        },
      }
    );

    const locais = response.data.results.map((r, index) => ({
      id: 100000 + index,
      nome_comercio: r.name,
      tipo_comercio: "vegano",
      descricao_comercio: r.formatted_address || "",
      latitude: r.geometry.location.lat,
      longitude: r.geometry.location.lng,
    }));

    res.json(locais);
  } catch (err) {
    console.error("❌ Erro na API Google:", err.message);
    res
      .status(500)
      .json({ erro: "Erro ao buscar estabelecimentos via Google" });
  }
});

module.exports = router;
