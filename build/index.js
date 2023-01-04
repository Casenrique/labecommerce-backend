"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Teste");
const types_1 = require("./types");
const database_1 = require("./database");
(0, database_1.createUser)("u003", "beltrano@email.com", "beltrano99");
(0, database_1.getAllUsers)();
(0, database_1.createProduct)("p003", "Picanha", 60, types_1.CATEGORIES.MEAT);
(0, database_1.getAllProducts)();
console.log((0, database_1.getProductById)("p001"));
(0, database_1.createPurchase)("u003", "p003", 3, 180);
console.log((0, database_1.getAllPurchasesFromUserId)("u003"));
//# sourceMappingURL=index.js.map