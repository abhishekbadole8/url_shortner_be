const Url = require("../models/urlModel");

// @desc Get redirect Url
// @route Get /
// @access Public route
const urlRedirect = async (req, res) => {
  try {
    const { urlId } = req.params;

    const updatedUser = await Url.findOneAndUpdate(
      { "urls.url_id": urlId },
      {
        $inc: { "urls.$.visit_count": 1 },
      },
      {
        new: true,
      }
    );
    if (updatedUser) {
      const updatedUrlObject = await updatedUser.urls.find(
        (url) => url.url_id === urlId
      );
      const original = updatedUrlObject.original_url;
      return res.redirect(original);
    } else {
      return res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = urlRedirect;
