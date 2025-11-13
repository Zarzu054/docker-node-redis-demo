import express from "express";
import { createClient } from "redis";

const app = express();

// Configurar Redis (nombre del servicio = "redis" del docker-compose)
const client = createClient({ url: "redis://redis:6379" });

client.on("error", (err) => console.error("❌ Error de conexión con Redis:", err));

// Conectamos al iniciar la app
await client.connect();

// Endpoint principal
app.get("/", async (req, res) => {
  const visits = (await client.get("visits")) || 0;
  const newCount = parseInt(visits) + 1;

  await client.set("visits", newCount);

  res.send(`🚀 Servidor dentro de Docker — visitas: ${newCount}`);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("✅ Servidor corriendo en http://localhost:3000");
});
