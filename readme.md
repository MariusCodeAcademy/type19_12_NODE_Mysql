# Galutine praktine uzduotis

Uzduotis skirta patikrinti ar mokate naudoti:

1. Back End - Node.js, Express, Mysql, REST API, Git, GitHub,
2. Front End - Vite, Typescript, Tailwind, React, Git, GitHub,

Reikes sukurti du projektus:

1. Back End - JSON REST API
2. Front End - React aplikacija

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

## Front end

inspiration https://www.figma.com/community/file/1219890698200192960

Sukurti projekta su vite, naudojant typescript.
Pradeti nuo boiler plate, su tailwind arba be.

1. Prisideti routeri
2. Sukurti Home, Trips, Countries puslapius
3. Sukurti Header navigacijai
4. Susikurti Button komponenta (UI)

### Trip Page

1. kreiptis i musu back end ir gauti visas keliones ir atvaizduotji jas korteliu pavidalu, be description ir be papildomu paveiksleliu.
2. Kiekviena kortele turi nuoroda ir veda i Single Trip Page, Paveiklelis irgi turi buti nuoroda i Single Trip Page

### Single Trip Page

1. Atejus i puslapi gaunam id keliones kuria atvaizduoti
2. Atvaizduojam visa informacija apie kelione su stylingu
3. Puslapis dalinamas i 2 dalis kaireje paveikslelis, desineje informacija.
4. Prideti mygtuka "Delete" kuris istrina kelione is back end jei vartotojas prisijunges ir savininkas

### Countries Page

1. kreiptis i musu back end ir gauti visas salis ir atvaizduoti jas korteliu pavidalu
2. Kiekviena kortele turi nuoroda ir veda i Single Country Page

### Single Country Page

1. Atejus i puslapi gaunam id salies kuria atvaizduoti
2. Atvaizduojam visa informacija apie sali su stylingu
3. Puslapis dalinamas i 2 dalis kaireje paveikslelis, desineje informacija.

### Auth Page

1. Sukurti Auth Page /auth

### Register forma

1. Sukurti forma su laukais: username, password, repeat password, email
2. Patikrinti ar slaptazodziai sutampa
3. Patikrinti ar email yra email formatas
4. Siusti duomenis i back end ir sukurti nauja vartotoja
5. Priklausomai nuo atsakymo parodyti pranesima ar pavyko ar ne

### Login forma

1. Sukurti forma su laukais: username, password
2. Siusti duomenis i back end ir prisijungti
3. Priklausomai nuo atsakymo parodyti pranesima ar pavyko ar ne

## Bendras aplikacijos state

Reikalingas bendras state kuris butu pasiekiamas visuose komponentuose.
Tai galima daryti su Context arba Redux.
State turi buti issaugomas i localstorage ir po puslapio persikrovimo tureti ta pati state.
