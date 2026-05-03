import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// __dirname is not available in ES modules — derive it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

const distPath = path.join(__dirname, "dist");

// Serve static assets from the built Vite output
app.use(express.static(distPath));

// For any route not matched by static files, return index.html (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});