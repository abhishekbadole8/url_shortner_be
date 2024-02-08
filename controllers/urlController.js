const { nanoid } = require("nanoid");
const Url = require("../models/urlModel");

// generate short url
//private
const createShortUrl = async (req, res) => {
  try {
    const shortId = nanoid(8); // generate ramdom short id
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
      url_id: shortId,
      short_url: `${process.env.REDIRECT_API}${shortId}`,
      original_url,
    });

    await url.save();

    return res
      .status(201)
      .json({ shortUrl: `${process.env.REDIRECT_API}${shortId}` });
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

// get url
// private
const getShortUrls = async (req, res) => {
  try {
    const id = req.id;
    // Find the document with the userId
    let url = await Url.findOne({ userId: id });

    return res.status(200).json({ urls: url.urls });
  } catch (error) {
    return res.status(200).json({ error: "internal server error" });
  }
};

const removeShortUrl = async (req, res) => {
  try {
    const id = req.id;
    const { shortId } = req.params;

    if (!shortId) {
      return res.status(400).json({ error: "shortId is required" });
    }

    const updatedUser = await Url.findOneAndUpdate(
      { userId: id, "urls.url_id": shortId },
      { $pull: { urls: { url_id: shortId } } },
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

module.exports = { createShortUrl, getShortUrls, removeShortUrl };
