const express = require("express");
const bukuRoutes = require("./routes/bukuRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk membaca body JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "REST API Sistem Informasi Perpustakaan",
    endpoint: "/api/buku",
  });
});

app.use("/api/buku", bukuRoutes);

// Handler untuk route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
});

// Handler untuk error (misalnya JSON body tidak valid)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Format JSON pada body request tidak valid",
    });
  }
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
