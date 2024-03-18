# Galutine praktine uzduotis

Uzduotis skirta patikrinti ar mokate naudoti:

1. Back End - Node.js, Express, Mysql, REST API, Git, GitHub,
2. Front End - Vite, Typescript, Tailwind, React, Git, GitHub,

Reikes sukurti du projektus:

1. Back End - JSON REST API
2. Front End - React aplikacija

## Front end url

https://github.com/MariusCodeAcademy/type19-practice-trips-front

## Inspiration urls

1. https://www.figma.com/community/file/1182308758714734501
2. https://www.figma.com/community/file/1219890698200192960

## Back End

1. Sukurti nauja express projekta prijungti reikiamas bibliotekas
2. Sukurti duomenu baze "type19_trips_db"
3. Sukurti lenteles trips, countries, users
4. Sukurti kelis irasus kiekvienoje lenteleje

### Trips lentele

Laukai:

- id, name, date, country, city, rating, description, price, is_deleted, user_id, created_at, image_main, images_1, images_2, images_3

### Countries lentele

Laukai:

- id, name, description, image_main, is_deleted

### Users lentele

Laukai:

- id, username, password, email, is_deleted

## Routes

### Trips Routai

1. GET /trips - grazinti visus irasus
2. GET /trips/:id - grazinti viena irasa pagal id
3. POST /trips - sukurti nauja irasa
4. DELETE /trips/:id - istrinti irasa

### Countries Routai

1. GET /countries - grazinti visus irasus
2. GET /countries/:id - grazinti viena irasa pagal id
3. POST /countries - sukurti nauja irasa
4. DELETE /countries/:id - istrinti irasa
   4.1. DELETE /countries/:id - leisti istrinti tik jei savininkas istrina (extra)

### Auth Routai

1. POST /register - sukurti nauja vartotoja
2. POST /login - prisijungti - patikrinti ar teisingi duomenys
