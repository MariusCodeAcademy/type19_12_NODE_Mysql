-- lentele

CREATE TABLE trips (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    country VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    rating INT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_deleted BOOLEAN NOT NULL DEFAULT 0,
    user_id INT NOT NULL 
);

-- keletas irasu
INSERT INTO trips (name, date, country, city, rating, description, price, user_id) 
VALUES 
('Trip to Paris', '2024-10-10', 'France', 'Paris', 5, 'Paris is the capital of France', 1000, 1),
('Trip to London', '2021-11-10', 'United Kingdom', 'London', 4, 'London is the capital of England', 800, 1),
('Trip to Rome', '2021-12-10', 'Italy', 'Rome', 3, 'Rome is the capital of Italy', 900, 2);