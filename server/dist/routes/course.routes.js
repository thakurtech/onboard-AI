"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const router = (0, express_1.Router)();
router.post('/generate', course_controller_1.generateCourse);
exports.default = router;
