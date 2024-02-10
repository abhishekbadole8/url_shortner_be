const { nanoid } = require("nanoid");
const Url = require("../models/urlModel");

// @desc Create short Url
// @route Put api/user/url
// @access Private route
const createShortUrl = async (req, res) => {
  try {
    const urlId = nanoid(5); // generate ramdom short id
    const id = req.id;
    const { original_url } = req.body;

    if (!original_url) {
      return res.status(400).json({ error: "url is required" });
    }

    let url = await Url.findOne({ userId: id });

    if (!url) {
      url = new Url({ userId: id, urls: [] });
    }

    url.urls.push({
      url_id: urlId,
      short_url: process.env.REDIRECT_API + urlId,
      original_url,
    });

    await url.save();

    return res.status(201).json({ shortUrl: process.env.REDIRECT_API + urlId });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

// @desc Get short Url's
// @route Get api/user/urls
// @access Private route
const getShortUrls = async (req, res) => {
  try {
    const id = req.id;
    // Find the document with the userId
    let url = await Url.findOne({ userId: id });
    if (!url) {
      return res.status(400).json({
        error: `User with userid ${id} not found in the database.`,
      });
    }
    return res.status(200).json({ urls: url.urls });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ error: "internal server error" });
  }
};

// @desc Remove short Url
// @route Delete api/user/urls/:urlId
// @access Private route
const removeShortUrl = async (req, res) => {
  try {
    const id = req.id;
    const { urlId } = req.params;

    if (!urlId) {
      return res.status(400).json({ error: "shortId is required" });
    }

    const updatedUser = await Url.findOneAndUpdate(
      { userId: id, "urls.url_id": urlId },
      { $pull: { urls: { url_id: urlId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    return res.status(200).json({ message: "Short URL deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

// @desc Update short Url
// @route Put api/user/urls/:urlId
// @access Private route
const updateShortUrl = async (req, res) => {
  try {
    const id = req.id;
    const { urlId } = req.params;
    const { original_url } = req.body;

    if (!urlId || !original_url) {
      return res.status(400).json({ error: "urlId and original_url are required" });
    }

    const updatedUser = await Url.findOneAndUpdate(
      { userId: id, "urls.url_id": urlId },
      { $set: { "urls.$.original_url": original_url } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.status(200).json({ message: "Short URL updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = { createShortUrl, getShortUrls, removeShortUrl,updateShortUrl };
