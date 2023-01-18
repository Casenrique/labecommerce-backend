-- Active: 1673887120007@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Exercício 1 - Aprofundamento SQL - Create User

INSERT INTO users (id, email, password)
VALUES 
    ("u001", "professorx@marvel.com", "Produto$m4nual"),
    ("u002", "feiticeiraescarlate@marvel.com", "MeusFilho$Minh4Vid4"),
    ("u003", "flash@dc.com", "Fla$hR3vers0");

INSERT INTO users (id, email, password)
VALUES ("u004", "batman@dc.com", "3raVeneno$a");

-- Exercício 1 - Aprofundamento SQL - Get All Users

SELECT * FROM users;

-- Exercício 3 - Aprofundamento SQL - Get All Users - Ascendente

SELECT * FROM users
ORDER BY email ASC;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

-- Exercício 1 - Aprofundamento SQL - Create Product

INSERT INTO products (id, name, price, category)
VALUES 
    ("p001", "Bala", 0.50, "Doces"),
    ("p002", "Maça", 10.50, "Frutas"),
    ("p003", "Bisteca Bovina", 30.50, "Carne Bovina"),
    ("p004", "Chocolate", 4.50, "Doces"),
    ("p005", "Maminha", 45.50, "Carne Bovina");

INSERT INTO products (id, name, price, category)
VALUES ("p006", "Pera", 9.90, "Frutas");

-- Exercício 1 - Aprofundamento SQL - Get All Products

SELECT * FROM products;

-- Exercício 3 - Aprofundamento SQL - Get All Products versão 1

SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;

-- Exercício 3 - Aprofundamento SQL - Get All Products versão 2

SELECT * FROM products
WHERE price >= 5 And price <= 35
ORDER BY price ASC;

PRAGMA table_info("users");
PRAGMA table_info("products");

-- Exercício 2 - Aprofundamento SQL - Delete User by id

DELETE FROM users
WHERE id = "u001";

-- Exercício 2 - Aprofundamento SQL - Delete Product by id

DELETE FROM products
WHERE id = "p001";

DROP TABLE users;
DROP TABLE products;

-- Exercício 1 - Aprofundamento SQL - Search Product by name

SELECT * FROM products
WHERE name LIKE "%Ma%";
-- WHERE name = "Maça";

-- Exercício 2 - Aprofundamento SQL - Get Products by id

SELECT * FROM products
WHERE id = "p005";

-- Exercício 2 - Aprofundamento SQL - Edit User by id

UPDATE users
SET password = "C3rebr0"
WHERE id = "u001";

-- Exercício 2 - Aprofundamento SQL - Edit Product by id

UPDATE products
SET price = 3.90
WHERE id = "p004";

SELECT MIN(price) as minPrice
FROM products;


-- Relações SQL - Exercício 1

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)
);

-- Relações SQL - Exercício 2

INSERT into purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES
    ("pu001", 12.90, 0, NULL, "u001"),
    ("pu002", 55.90, 0, NULL, "u001"),
    ("pu003", 39.90, 0, NULL, "u002"),
    ("pu004", 99.90, 0, NULL, "u002"),
    ("pu005", 31.90, 0, NULL, "u003"),
    ("pu006", 76.90, 0, NULL, "u003"),
    ("pu007", 44.90, 0, NULL, "u004"),
    ("pu008", 62.90, 0, NULL, "u004");

    SELECT * FROM purchases;

    UPDATE purchases
    SET 
        paid = 1,
        delivered_at = DATETIME('now')
    WHERE id = "pu001";

    -- Relações SQL - Exercício 3

    SELECT * FROM purchases
    INNER JOIN users
    ON purchases.buyer_id = users.id
    where users.id = "u001";
    -- GROUP BY buyer_id;



    