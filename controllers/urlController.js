const { nanoid } = require("nanoid");
const Url = require("../models/urlModel");

const getShortUrl = async (req, res) => {
  try {
    const shortId = nanoid(8);
    const id = req.id;
    const { original_url } = req.body;
    // Check if original_url is provided
    if (!original_url) {
      return res.status(400).json({ error: "url is required" });
    }

    // Find the document with the userId
    let url = await Url.findOne({ id });

    // If the document doesn't exist, create a new one
    if (!url) {
      url = new Url({ userId:id, urls: [] });
    }

    // Update the urls array with the new URL
    url.urls.push({ url_id: shortId, original_url });

    // Save the updated document
    await url.save();

    return res
      .status(201)
      .json({ shortUrl: `http://localhost:5001/${shortId}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

const removeShortUrl = async (req, res) => {
  try {
    const userId = req.headers.id;
    const shortId = req.params;
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = { getShortUrl, removeShortUrl };
