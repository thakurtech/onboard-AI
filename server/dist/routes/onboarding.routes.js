"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const onboarding_controller_1 = require("../controllers/onboarding.controller");
const router = (0, express_1.Router)();
router.post('/upload', onboarding_controller_1.upload.single('file'), onboarding_controller_1.uploadFile);
router.post('/generate', onboarding_controller_1.generatePlan);
exports.default = router;
