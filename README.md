 
# survey app
# with vue 3 + tailwindcss + laravel 9 + mysql

### 🚀 [Demo](####) 

## ⚙ Installation

# in survey folder run
* `npm install`
* `npm run dev`

# in api folder run
* `composer install`
# copy .env.example to .env
cp .env.example .env
# generate security key , link storage file
php artisan key:generate
php artisan migrate:fresh --seed
