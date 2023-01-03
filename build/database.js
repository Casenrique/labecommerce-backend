"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "Carlos",
        email: "carlimhenrique@yahoo.com.br",
        password: "carlos123"
    },
    {
        id: "Henrique",
        email: "henrique@yahoo.com.br",
        password: "henrique123"
    }
];
exports.products = [
    {
        id: "001",
        name: "Bala",
        price: 0.50,
        category: "Doces"
    },
    {
        id: "002",
        name: "Maça",
        price: 10.50,
        category: "Frutas"
    }
];
exports.purchases = [
    {
        userId: 'Carlos',
        productId: '001',
        quantity: 10,
        totalPrice: 5.00
    },
    {
        userId: 'Henrique',
        productId: '002',
        quantity: 1,
        totalPrice: 10.50
    }
];
//# sourceMappingURL=database.js.map