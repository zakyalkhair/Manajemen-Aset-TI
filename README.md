# IT Asset Management System
Sistem manajemen aset TI kantor berbasis web yang dirancang untuk membantu
pengelolaan inventori aset, permintaan peminjaman, alokasi stok, serta
monitoring penggunaan aset secara terkontrol.

---

## Gambaran Umum
Sistem ini menggunakan pendekatan:
- Berbasis role (Admin & User)
- Alur permintaan yang jelas dan terstruktur
- Pencatatan pergerakan stok sebagai audit trail
- Arsitektur backend–frontend yang terpisah dan scalable

---

## Tech Stack

- **Backend**  : Laravel 11 (REST API)
- **Auth**     : JWT (JSON Web Token)
- **Frontend** : Nuxt.js
- **Database** : PostgreSQL

---

## Fitur Utama

### Admin
- Dashboard monitoring stok aset TI
- Manajemen data aset dan inventori
- Persetujuan permintaan aset dari user
- Alokasi stok (mendukung alokasi parsial)
- Riwayat pergerakan stok (stock in / out)

### User
- Pengajuan permintaan aset TI
- Monitoring status permintaan
- Riwayat peminjaman aset
- Akses profil pengguna

---

## Alur Sistem

1. User mengajukan permintaan aset TI
2. Admin melakukan persetujuan permintaan
3. Admin mengalokasikan stok sesuai ketersediaan
4. Sistem otomatis:
   - Mengurangi stok aset
   - Mencatat pergerakan stok
   - Memperbarui status permintaan hingga selesai

Alur ini dirancang agar setiap perubahan data dapat ditelusuri
dan dipertanggungjawabkan.

---

## Struktur Repository

├── backend/ # Laravel REST API
│ ├── app/
│ ├── routes/
│ ├── database/
│ └── README.md
│
├── frontend/ # Nuxt.js
│ ├── pages/
│ ├── components/
│ ├── middleware/
│ ├── plugins/
│ ├── nuxt.config.ts
│ └── README.md
│
├── docs/ # Dokumentasi pendukung (ERD, flow, dsb.)
└── README.md # Dokumentasi utama

---

## Instalasi & Menjalankan Aplikasi

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

Frontend (Nuxt)
cd frontend
npm install
npm run dev