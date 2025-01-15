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
exports.createCaptain = createCaptain;
const captain_models_1 = require("../models/captain.models");
function createCaptain(_a) {
    return __awaiter(this, arguments, void 0, function* ({ firstname, password, lastname, vehicle, email, location }) {
        if (!firstname || !email || !vehicle || !password) {
            console.log(firstname);
            console.log(lastname);
            console.log(email);
            console.log(password);
            console.log(vehicle);
            throw new Error('ALl fields are required');
        }
        else {
            const captain = yield captain_models_1.captainModel.create({
                fullname: {
                    firstname,
                    lastname
                },
                email,
                password,
                vehicle,
                location
            });
            return captain;
        }
    });
}
