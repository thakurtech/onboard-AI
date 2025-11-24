"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUserByEmail = exports.createUserTable = void 0;
const db_1 = require("../db");
const createUserTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const text = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'employee',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
    yield (0, db_1.query)(text);
});
exports.createUserTable = createUserTable;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const text = 'SELECT * FROM users WHERE email = $1';
    const res = yield (0, db_1.query)(text, [email]);
    if (res.rows.length > 0) {
        return res.rows[0];
    }
    return null;
});
exports.findUserByEmail = findUserByEmail;
const createUser = (email_1, passwordHash_1, ...args_1) => __awaiter(void 0, [email_1, passwordHash_1, ...args_1], void 0, function* (email, passwordHash, role = 'employee') {
    const text = 'INSERT INTO users(email, password_hash, role) VALUES($1, $2, $3) RETURNING *';
    const res = yield (0, db_1.query)(text, [email, passwordHash, role]);
    return res.rows[0];
});
exports.createUser = createUser;
