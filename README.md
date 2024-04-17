# Kazoku Assement

## Setup
### Step 1 Meng-cloning app
Silahkan clone app ini dari repository ini, cara nya buka terminal/cmd, lalu ketikan perintah
```
git clone https://github.com/yuliantosb/kazokku-assesment.git
```
### Step 2 Membuat environment
Silahkan copy file `.env.example` dan rename menjadi `.env` dengan menjalankan perintah
```
cp .env.example .env
```

### Step 3 Mengubah variable environment
Silahkan buka file `.env` lalu ubah bagian ini
```
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=kazokku
DB_USERNAME=kazokku
DB_PASSWORD=satu2tiga
```
anda bisa mengubah sesuai keinginan anda, ini hanya sebagai sampel, tetapi untuk `DB_HOST` harus disesuaikan sesuai dengan nama network yang sudah di set

### Step 4 Build app kedalam docker image
Silahkan masuk ke folder app `cd kazokku-assesment` lalu ketikan perintah 
```
docker build app
```

### Step 5 Menjalankan docker image
Untuk menjalankan docker image anda harus mengetikan perintah
```
docker-compose up -d
```

### Step 6 Menginstall composer
Untuk menginstall composer cukup dengan menjalan perintah
```
docker-compose exec app composer install
```

### Step 7 Membuat APP_KEY
Untuk membuat APP_KEY bisa dengan mengetikan perintah
```
docker-compose exec app php artisan key:generate
```

### Step 8 Menginstall node_module 
Untuk menginstall node_modules bisa dengan mengetikan perintah
```
docker-compose exec app npm install
```

### Step 9 Membuild frontend
Untuk menginstall node_modules bisa dengan mengetikan perintah
```
docker-compose exec app npm run build
```

### Step 10 Migrate dan seed
Untuk menginstall node_modules bisa dengan mengetikan perintah
```
docker-compose exec app php artisan migrate --seed
```

### Step 11 membuat JWT Secret
Untuk membuat JWT Secret cukup dengan menjalankan perintah
```
docker-compose exec app php artisan jwt:secret
```

### Step 12 Jalankan app di browser
Untuk menjalankan app di browser cukup mengunjungi halaman ini di prambanan anda
```
http://localhost:8000
```
Untuk user login bisa menggunakan user berikut
1. Untuk Admin
```
email: admin@example.com
password: password
```

2. Untuk user
```
email: user@example.com
password: password
```
