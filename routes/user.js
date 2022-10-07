import express from 'express'
import {createSignature,keyVerification } from '../controllers/user.js';
const router = express.Router()
router.post('/signing',createSignature);
router.post('/verify',keyVerification);

export default router  