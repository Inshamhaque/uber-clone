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
exports.createUser = createUser;
const user_models_1 = require("../models/user.models");
function createUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ firstname, lastname, email, password }) {
        if (!firstname || !email || !password) {
            throw new Error('All fields are required');
        }
        const user = user_models_1.userModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password
        });
        return user;
    });
}
