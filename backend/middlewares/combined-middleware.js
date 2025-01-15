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
exports.combined_address = combined_address;
const auth_1 = require("./auth");
const validate_1 = require("./validate");
function combined_address(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, auth_1.authUser)(req, res, next);
        (0, validate_1.validate)(validate_1.addressSchema);
        next();
    });
}
