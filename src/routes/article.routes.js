import express from "express";
import articleController from "../controllers/article.controller.js";

const router = express.Router();

router.get("/:id", articleController.getArticleDetail);
router.post("/:id/comment", articleController.postComment);
router.get("/:id/download-pdf", articleController.downloadPDF);

export default router;
