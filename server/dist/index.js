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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const onboarding_routes_1 = __importDefault(require("./routes/onboarding.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const interviewer_routes_1 = __importDefault(require("./routes/interviewer.routes"));
const user_model_1 = require("./models/user.model");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.default);
app.use('/api/onboarding', onboarding_routes_1.default);
app.use('/api/courses', course_routes_1.default);
app.use('/api/ai', ai_routes_1.default);
app.use('/api/interviewer', interviewer_routes_1.default);
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_model_1.createUserTable)();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.warn('Database connection failed. Running without database persistence.');
        console.warn('Note: You need to start PostgreSQL for full functionality.');
    }
    console.log(`Server running on port ${PORT}`);
}));
