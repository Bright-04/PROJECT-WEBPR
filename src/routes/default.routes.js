import express from "express";
import defaultController from "../controllers/default.controller.js";
import { registerValidation } from "../validators/register.validator.js";
const router = express.Router();

router.get("/", function (req, res) {
	res.redirect("/homepage")
});

router.get("/register", function (req, res) {
	res.render("vwLogin/Register", { layout: "layouts/login.main.ejs" });
});

router.post("/register", registerValidation, defaultController.postRegister);

router.get("/login", defaultController.getLogin);

router.post("/login", defaultController.postLogin);

router.get("/logout", defaultController.getLogout);

router.get("/forget", function (req, res) {
	res.render("vwLogin/Forget", { layout: "layouts/login.main.ejs" });
});

router.get("/OTP", function (req, res) {
	res.render("vwLogin/OTP", { layout: "layouts/login.main.ejs" });
});

router.get("/404", function (req, res) {
	res.render("vwError/404", { layout: "layouts/login.main.ejs" });
});

router.get("/500", function (req, res) {
	res.render("vwError/500", { layout: "layouts/login.main.ejs" });
});
export default router;
