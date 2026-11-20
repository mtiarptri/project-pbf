const bukuModel = require("../models/bukuModel");

// GET /api/buku - tampilkan semua buku
const getAllBuku = (req, res) => {
  const data = bukuModel.getAll();
  res.status(200).json({
    success: true,
    message: "Data buku berhasil ditampilkan",
    total: data.length,
    data,
  });
};

// GET /api/buku/:id - tampilkan detail buku
const getBukuById = (req, res) => {
  const id = parseInt(req.params.id);
  const data = bukuModel.getById(id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: `Buku dengan ID ${req.params.id} tidak ditemukan`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Detail buku berhasil ditampilkan",
    data,
  });
};

// POST /api/buku - tambah buku
const createBuku = (req, res) => {
  const { kode, judul, pengarang, tahunTerbit, stok } = req.body;

  if (!kode || !judul || !pengarang || tahunTerbit === undefined || stok === undefined) {
    return res.status(400).json({
      success: false,
      message: "Field kode, judul, pengarang, tahunTerbit, dan stok wajib diisi",
    });
  }

  if (bukuModel.getByKode(kode)) {
    return res.status(409).json({
      success: false,
      message: `Buku dengan kode ${kode} sudah ada`,
    });
  }

  const data = bukuModel.create({ kode, judul, pengarang, tahunTerbit, stok });

  res.status(201).json({
    success: true,
    message: "Data berhasil ditambahkan",
    data,
  });
};

// PUT /api/buku/:id - ubah buku
const updateBuku = (req, res) => {
  const id = parseInt(req.params.id);
  const data = bukuModel.update(id, req.body);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: `Buku dengan ID ${req.params.id} tidak ditemukan`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Data berhasil diubah",
    data,
  });
};

// DELETE /api/buku/:id - hapus buku
const deleteBuku = (req, res) => {
  const id = parseInt(req.params.id);
  const data = bukuModel.remove(id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: `Buku dengan ID ${req.params.id} tidak ditemukan`,
    });
  }

  res.status(200).json({
    success: true,
    message: "Data berhasil dihapus",
    data,
  });
};

module.exports = { getAllBuku, getBukuById, createBuku, updateBuku, deleteBuku };
