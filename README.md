# Dokumentasi untuk tugas fullstack developer di yubi tech

## Deskripsi singkat

Ini adalah tugas sederhana untuk menggambarkan kemampuan coding saya untuk melamar kerja sebagai fullstack developer di yubi tech.

## Tech Stack

- Programming language: Typescript
- Framework: Nestjs & Nextjs
- Database: Postgresql
- Object Relational Mapping (ORM): Sequelize
- Gateway: Nginx
- Containerization: Docker & Docker Compose
- Cloud Provider: Amazon Web Service

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-08-13%20at%2006.58.46.png?updatedAt=1723507359293)

## Struktur Backend : Microservices

![Microservices](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-08-13%20at%2007.17.39.png?updatedAt=1723509281923)

### Note :

- saya menggunakan 1 database yang sama untuk semua service, karena untuk menghemat resource server, sebaiknya setiap service memiliki database masing masing untuk responsibility yang baik
- Bagian order seharusnya bisa di pisah menjadi 2 yaitu: Products-service dan Order-Service

## Architecture Cloud

![Architecture](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-08-13%20at%2007.31.48.png?updatedAt=1723509281560)

### Penjelasan Detail :

- EC2 : t4g.micro (2 Core & 1 Memory (GiB))
- Security Group :
  - ssh : only my ip
  - http : 0.0.0.0 (public)
  - https : 0.0.0.0 (public)

### Note :

- Saya menggunakan Spot Instance untuk menghemat biaya, namun aplikasi ini akan mati kapan saja

## Instalasi dan Cara Menjalankan

Docker adalah cara termudah dan teraman untuk menjalankan aplikasi ini tanpa masalah konfigurasi apa pun. Jika Anda belum memiliki Docker, Anda dapat mengunduhnya dari situs resmi Docker.

1. Klon repositori ini dari GitHub

   ```bash
   git clone https://github.com/sarrahman-me/yubi-tech-test.git
   ```

2. Navigasikan ke direktori yang berisi file docker-compose.yml

   ```bash
   cd yubi-tech-test/backend/docker
   ```

3. Jalankan semua aplikasi dan database menggunakan docker

   ```bash
   docker compose up
   ```

4. Pastikan semuanya berjalan dengan baik dengan mencoba mengakses gateway api di sini

   ```bash
   http://localhost:80
   ```

## Screen Shot Tampilan Aplikasi

![LoginPage](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-08-12%20at%2011.12.24.png?updatedAt=1723510492791)

![Management Pelanggan](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-08-13%20at%2007.53.58.png?updatedAt=1723510506637)

![Form Pelanggan](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-08-13%20at%2007.54.08.png?updatedAt=1723510506714)

## Hasil Unit Test dan Integration Test

Saya sedang mengerjakan ini sekarang, termasuk menyiapkan dokumentasi postman dan swagger nanti saya akan push ke github :)
