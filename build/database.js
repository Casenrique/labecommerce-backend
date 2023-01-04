"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
    {
        id: "u001",
        email: "carlimhenrique@yahoo.com.br",
        password: "carlos123"
    },
    {
        id: "u002",
        email: "henrique@yahoo.com.br",
        password: "henrique123"
    }
];
exports.products = [
    {
        id: "p001",
        name: "Bala",
        price: 0.50,
        category: types_1.CATEGORIES.CANDIES
    },
    {
        id: "p002",
        name: "Maça",
        price: 10.50,
        category: types_1.CATEGORIES.FRUITS
    }
];
exports.purchases = [
    {
        userId: 'u001',
        productId: 'p001',
        quantity: 10,
        totalPrice: 5.00
    },
    {
        userId: 'u002',
        productId: 'p002',
        quantity: 1,
        totalPrice: 10.50
    }
];
function createUser(id, email, password) {
    const newUser = {
        id,
        email,
        password
    };
    exports.users.push(newUser);
    console.log(exports.users);
    console.log("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.products.push(newProduct);
    console.log(exports.products);
    console.log("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return (exports.products.filter((product) => product.id === idToSearch));
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    const query = exports.products.filter((product) => {
        product.name.toLowerCase().includes(q.toLowerCase());
    });
    console.table(query);
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    console.table(newPurchase);
    exports.purchases.push(newPurchase);
    console.log("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromUserId(userIdToSearch) {
    return (exports.purchases.filter((purchase) => purchase.userId === userIdToSearch));
}
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map