# ExpressJS API

Project ini adalah REST API sederhana menggunakan ExpressJS, Prisma, dan MySQL.

## Fitur

- Register & Login user (JWT authentication)
- CRUD user
- Validasi input dengan Zod
- Dokumentasi API dengan Swagger

## Instalasi

1. Clone repo ini
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy file `.env.example` ke `.env` dan sesuaikan konfigurasi database:
   ```
   cp .env.example .env
   ```
4. Jalankan migrasi Prisma:
   ```sh
   npx prisma migrate deploy
   ```
5. Jalankan server:
   ```sh
   npm run dev
   ```

## Dokumentasi API

Buka [http://localhost:3000/api-docs](http://localhost:3000/api-docs) untuk melihat dokumentasi Swagger.

## Struktur Folder

- `controllers/` - Logic endpoint
- `routes/` - Routing API
- `middleware/` - Middleware (auth, dll)
- `libs/` - Validasi schema
- `prisma/` - Konfigurasi & migrasi database

##
