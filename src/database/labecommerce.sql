-- Active: 1673887120007@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DEFAULT (DATETIME('now','localtime')) NOT NULL
);

-- Exercício 1 - Aprofundamento SQL - Create User

INSERT INTO users (id, name, email, password)
VALUES 
    ("u001", "Professor X", "professorx@marvel.com", "Produto$m4nual"),
    ("u002", "Feiticeira Escarlate", "feiticeiraescarlate@marvel.com", "MeusFilho$Minh4Vid4"),
    ("u003", "Flash", "flash@dc.com", "Fla$hR3vers0");

INSERT INTO users (id, name, email, password)
VALUES ("u004", "Batman", "batman@dc.com", "3raVeneno$a");

-- Exercício 1 - Aprofundamento SQL - Get All Users

SELECT * FROM users;

-- Exercício 3 - Aprofundamento SQL - Get All Users - Ascendente

SELECT * FROM users
ORDER BY email ASC;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL, 
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Exercício 1 - Aprofundamento SQL - Create Product

INSERT INTO products (id, name, price, category, description, image_url)
VALUES 
    ("p001", "Bala", 0.50, "Doces", "Bala de Morango", "https://picsum.photos/200"),
    ("p002", "Maça", 10.50, "Frutas", "Maçar Argentina", "https://picsum.photos/200"),
    ("p003", "Bisteca Bovina", 30.50, "Carne Bovina", "Carne de primeira", "https://picsum.photos/200"),
    ("p004", "Chocolate", 4.50, "Doces", "Chocolate ao leite", "https://picsum.photos/200"),
    ("p005", "Maminha", 45.50, "Carne Bovina", "Carne magra", "https://picsum.photos/200");

INSERT INTO products (id, name, price, category, description, image_url)
VALUES ("p006", "Pera", 9.90, "Frutas", "Fruta Nacional", "https://picsum.photos/200");

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

PRAGMA table_info("purchases");

-- Exercício 2 - Aprofundamento SQL - Delete User by id

DELETE FROM users
WHERE id = "u001";

-- Exercício 2 - Aprofundamento SQL - Delete Product by id

DELETE FROM products
WHERE id = "p001";

DROP TABLE users;
DROP TABLE products;

DROP TABLE purchases;

DROP TABLE purchases_products;

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
SET description = "Maça Argentina"
WHERE id = "p002";

SELECT MIN(price) as minPrice
FROM products;

-- Relações SQL - Exercício 1

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME('now','localtime')) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id) ON UPDATE CASCADE
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

-- Relações SQL II - Exercício 1
    
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases (id),
    FOREIGN KEY (product_id) REFERENCES products (id) ON UPDATE CASCADE
);

-- Relações SQL II - Exercício 2

INSERT INTO purchases_products -- This is the cart
VALUES
    ("pu001", "p006", 1),
    ("pu001", "p001", 6),   
    ("pu002", "p006", 1),
    ("pu002", "p001", 1),
    ("pu002", "p005", 1),
    ("pu003", "p006", 1),
    ("pu003", "p003", 1),
    ("pu003", "p001", 18);

SELECT * FROM purchases_products;

SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;


    