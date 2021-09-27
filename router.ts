import express from "express";
const router = express.Router();
import { downloadVideo } from "./controller";
router.post("/download", downloadVideo);
export default router
