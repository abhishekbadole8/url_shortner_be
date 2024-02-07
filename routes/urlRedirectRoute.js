const express = require("express");
const router = express.Router();
const urlRedirectController = require("../controllers/urlRedirectController");

router.get("/:shortId", urlRedirectController);

module.exports = router;