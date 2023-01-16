-- Active: 1673887120007@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES 
    ("u001", "professorx@marvel.com", "Produto$m4nual"),
    ("u002", "feiticeiraescarlate@marvel.com", "MeusFilho$Minh4Vid4"),
    ("u003", "flash@dc.com", "Fla$hR3vers0");

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES 
    ("p001", "Bala", 0.50, "Doces"),
    ("p002", "Maça", 10.50, "Frutas"),
    ("p003", "Bisteca Bovina", 30.50, "Carne Bovina"),
    ("p004", "Chocolate", 4.50, "Doces"),
    ("p005", "Maminha", 45.50, "Carne Bovina");

    SELECT * FROM products;

    PRAGMA table_info("users");
    PRAGMA table_info("products");

    DELETE FROM users
    WHERE id = "u001";

    DELETE FROM products
    WHERE id = "p001";

    DROP TABLE users;
    DROP TABLE products;

