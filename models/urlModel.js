const { default: mongoose } = require("mongoose");

const urlSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  urls: [
    {
      url_id: {
        type: String,
        required: true,
        unique: true,
      },
      short_url: {
        type: String,
        required: true,
      },
      original_url: {
        type: String,
        required: true,
      },
      visit_count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  ],
});

module.exports = mongoose.model("URL", urlSchema);
