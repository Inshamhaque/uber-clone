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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const bcrypt_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'first name must be atleast 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jsonwebtoken_1.default.sign({ _id: this._id }, 'JWT_SECRET', { expiresIn: '24h' });
    return token;
};
userSchema.methods.comparePasswrd = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
userSchema.statics.hashPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('error ocurrred while hashing');
            }
            else {
                console.log('hashed string is', hash);
            }
        });
    });
};
exports.userModel = mongoose_1.default.model('user', userSchema);
