const express = require("express");
const router = express.Router();
const { getShortUrl, removeShortUrl } = require("../controllers/urlController");
const authTokenHandler = require("../middlewares/authHandler");

router.put("/url", authTokenHandler, getShortUrl);
router.delete("/:shortId", authTokenHandler, removeShortUrl);

module.exports = router;
