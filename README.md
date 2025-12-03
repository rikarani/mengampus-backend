# ini backend dari projek mengampus
# untuk frontend bisa cek [disini](https://github.com/rikarani/mengampus-frontend)

## Teknologi yang digunakan
- Node.js
- Express.js
- MySQL
- Prisma ORM

## Instalasi
1. Clone repository ini ke lokal mesin Anda:
   ```bash
   git clone
   ```
2. Masuk ke direktori proyek:
   ```bash
   cd mengampus-backend
   ```
3. Install dependensi yang dibutuhkan:
   ```bash
   npm install
   ```
4. Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
5. Sesuaikan konfigurasi di file `.env` sesuai kebutuhan Anda.
    ```bash
    DATABASE_URL="mysql://username:password@host:port/database"
    ```
5. Jalankan migrasi database menggunakan Prisma:
   ```bash
   npx prisma migrate
   ```
6. Mulai server:
   ```bash
   npm start
   ```
