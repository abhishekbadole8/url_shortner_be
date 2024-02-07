const Url = require("../models/urlModel");

const urlRedirect = async (req, res) => {
  try {
    const { shortId } = req.params;

    const isUrl = await Url.findOneAndUpdate(
      { "urls.url_id": shortId },
      { $inc: { "urls.$.visit_count": 1 } },
      { new: true }
    );

    if (!isUrl) {
      return res.status(404).json({ error: "URL not found" });
    }

    const url = isUrl.urls.filter((url) => url.url_id === shortId);
    
    return res.redirect(url[0].original_url);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = urlRedirect;
