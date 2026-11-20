// Model: mengelola data buku menggunakan array (penyimpanan sementara)
let buku = [
  {
    id: 1,
    kode: "BK001",
    judul: "Pemrograman JavaScript Dasar",
    pengarang: "Andi Saputra",
    tahunTerbit: 2022,
    stok: 5,
  },
  {
    id: 2,
    kode: "BK002",
    judul: "Belajar Node.js dan Express",
    pengarang: "Budi Santoso",
    tahunTerbit: 2023,
    stok: 3,
  },
];

let nextId = 3;

const getAll = () => buku;

const getById = (id) => buku.find((item) => item.id === id);

const getByKode = (kode) => buku.find((item) => item.kode === kode);

const create = (data) => {
  const bukuBaru = {
    id: nextId++,
    kode: data.kode,
    judul: data.judul,
    pengarang: data.pengarang,
    tahunTerbit: data.tahunTerbit,
    stok: data.stok,
  };
  buku.push(bukuBaru);
  return bukuBaru;
};

const update = (id, data) => {
  const index = buku.findIndex((item) => item.id === id);
  if (index === -1) return null;

  buku[index] = {
    ...buku[index],
    kode: data.kode ?? buku[index].kode,
    judul: data.judul ?? buku[index].judul,
    pengarang: data.pengarang ?? buku[index].pengarang,
    tahunTerbit: data.tahunTerbit ?? buku[index].tahunTerbit,
    stok: data.stok ?? buku[index].stok,
  };
  return buku[index];
};

const remove = (id) => {
  const index = buku.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const [dihapus] = buku.splice(index, 1);
  return dihapus;
};

module.exports = { getAll, getById, getByKode, create, update, remove };
