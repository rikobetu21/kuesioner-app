# Aplikasi Kuesioner Online dengan Google OAuth

## Deskripsi Proyek

Aplikasi ini merupakan sistem kuesioner online yang dibangun menggunakan **Next.js**, **TypeScript**, **Prisma ORM**, dan **PostgreSQL**. Sistem memungkinkan pengguna untuk mengisi kuesioner secara online, sedangkan administrator dapat mengakses dashboard admin untuk melihat hasil kuesioner, ringkasan data, serta mengunduh hasil yang telah dikumpulkan.

Pada tugas ini telah dilakukan implementasi autentikasi menggunakan **Google OAuth** melalui **Auth.js (NextAuth)** sehingga hanya pengguna dengan akun Google tertentu yang dapat mengakses halaman administrator.

---

# Tujuan

Tujuan pengembangan aplikasi ini adalah:

- Membangun sistem kuesioner berbasis web menggunakan Next.js.
- Mengimplementasikan autentikasi menggunakan Google OAuth.
- Melindungi halaman administrator dari akses pengguna yang tidak memiliki hak akses.
- Mengelola data kuesioner secara aman menggunakan PostgreSQL dan Prisma ORM.

---

# Fitur Aplikasi

## Halaman Pengguna

- Mengisi kuesioner online
- Mengirim jawaban kuesioner
- Validasi data input
- Penyimpanan data ke database PostgreSQL

## Halaman Administrator

- Login menggunakan akun Google
- Menampilkan informasi akun administrator
- Dashboard admin
- Ringkasan hasil kuesioner
- Download hasil kuesioner
- Logout

---

# Implementasi Google OAuth

Autentikasi dilakukan menggunakan **Auth.js (NextAuth v5)** dengan provider Google.

Proses autentikasi adalah sebagai berikut:

1. Pengguna membuka halaman admin.
2. Sistem mengarahkan pengguna ke halaman Login Google.
3. Pengguna memilih akun Google.
4. Google melakukan proses autentikasi.
5. Setelah berhasil login, Auth.js membuat session pengguna.
6. Sistem memeriksa apakah email pengguna termasuk dalam daftar administrator (`ADMIN_EMAILS`).
7. Jika email terdaftar sebagai admin, pengguna dapat mengakses dashboard.
8. Jika email tidak terdaftar, akses akan ditolak.

---

# Hak Akses Administrator

Hak akses administrator dibatasi menggunakan variabel environment berikut:

```
ADMIN_EMAILS
```

Contoh:

```
ADMIN_EMAILS=admin@gmail.com,dosen@gmail.com
```

Hanya email yang terdaftar pada variabel tersebut yang dapat mengakses halaman:

```
/admin
```

serta endpoint API administrator.

---

# Proteksi Halaman

Halaman administrator dilindungi menggunakan Middleware Auth.js.

Halaman yang diproteksi:

```
/admin
```

Pengguna yang belum login akan diarahkan menuju proses autentikasi Google.

---

# Proteksi API

Endpoint administrator juga diproteksi sehingga hanya administrator yang telah login yang dapat mengakses data.

Contoh endpoint:

- /api/admin/export
- /api/admin/summary
- /api/admin/submissions/[id]/file

Jika pengguna belum login maka sistem akan mengembalikan:

```
401 Unauthorized
```

Jika pengguna login tetapi bukan administrator maka sistem mengembalikan:

```
403 Forbidden
```

---

# Teknologi yang Digunakan

- Next.js 16
- React 19
- TypeScript
- Auth.js (NextAuth v5)
- Google OAuth
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- Node.js

---

# Struktur Proyek

```
app/
│
├── admin/
│      page.tsx
│
├── api/
│      admin/
│      auth/
│      submit/
│      questions/
│
├── globals.css
├── layout.tsx
└── page.tsx

src/
│
├── components/
├── lib/
└── generated/

prisma/
│
├── schema.prisma
└── migrations/

public/

auth.ts
middleware.ts
```

---

# Konfigurasi Environment

Buat file `.env` berdasarkan file `.env.example`.

Contoh:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"

GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

AUTH_SECRET="YOUR_SECRET"

AUTH_URL="http://localhost:3000"

ADMIN_EMAILS="admin@gmail.com,dosen@gmail.com"
```

---

# Instalasi

Clone repository

```
git clone https://github.com/USERNAME/kuesioner-app.git
```

Masuk ke folder project

```
cd kuesioner-app
```

Install dependency

```
npm install
```

Generate Prisma Client

```
npx prisma generate
```

Migrasi database

```
npx prisma migrate dev
```

Menjalankan aplikasi

```
npm run dev
```

Aplikasi akan berjalan pada:

```
http://localhost:3000
```

---

# Cara Penggunaan

## Pengguna

1. Membuka halaman utama.
2. Mengisi seluruh pertanyaan.
3. Mengirim jawaban.
4. Data tersimpan ke database.

## Administrator

1. Membuka halaman:

```
/admin
```

2. Login menggunakan akun Google.

3. Sistem memverifikasi email administrator.

4. Jika email sesuai, dashboard admin akan ditampilkan.

5. Administrator dapat melihat ringkasan data.

6. Administrator dapat mengunduh hasil kuesioner.

7. Administrator dapat melakukan logout.

---

# Perubahan yang Dilakukan

Implementasi yang ditambahkan pada tugas ini meliputi:

✅ Menambahkan autentikasi menggunakan Google OAuth.

✅ Menambahkan konfigurasi Auth.js (NextAuth v5).

✅ Membuat file `auth.ts`.

✅ Menambahkan route autentikasi:

```
/api/auth/[...nextauth]
```

✅ Menambahkan Middleware untuk melindungi halaman administrator.

✅ Menambahkan whitelist email administrator menggunakan variabel `ADMIN_EMAILS`.

✅ Menambahkan informasi akun administrator pada dashboard.

✅ Menambahkan tombol Logout.

✅ Melindungi endpoint API administrator menggunakan session Auth.js.

✅ Menambahkan file `.env.example` sebagai contoh konfigurasi environment.

---

# Screenshot Implementasi

Dokumentasi implementasi meliputi:

1. Halaman Login Google
2. Dashboard Administrator
3. Login menggunakan akun non-admin
4. Halaman setelah Logout

---

# Hasil

Implementasi Google OAuth berhasil diterapkan pada aplikasi.

Pengguna umum hanya dapat mengakses halaman kuesioner, sedangkan halaman administrator hanya dapat diakses oleh akun Google yang telah terdaftar sebagai administrator.

Selain itu, endpoint API administrator juga telah diproteksi sehingga meningkatkan keamanan aplikasi.

---

# Author

**Fransiskus Xaverius Endriko Betu**

Program Studi Sistem Informasi

Universitas Merdeka Malang

Semester 7

---

# Lisensi

Project ini dibuat untuk memenuhi tugas Ujian Akhir Semester (UAS) mata kuliah Pengembangan Aplikasi Web dan digunakan hanya untuk keperluan akademik.