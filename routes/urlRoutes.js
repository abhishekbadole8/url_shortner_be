const express = require("express");
const router = express.Router();
const {
  createShortUrl,
  getShortUrls,
  removeShortUrl,
  updateShortUrl
} = require("../controllers/urlController");
const authTokenHandler = require("../middlewares/authHandler");

router.put("/url", authTokenHandler, createShortUrl); // generate new short url
router.get("/urls", authTokenHandler, getShortUrls); // get all urls

router.delete("/urls/:urlId", authTokenHandler, removeShortUrl); // delete short url

router.put("/urls/:urlId", authTokenHandler, updateShortUrl);

module.exports = router;
