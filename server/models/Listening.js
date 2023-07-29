const { DateTime } = require("luxon");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListeningSchema = new Schema(
  {
    event: {
      type: String,
      required: [true, "Please provide event"],
    },
    level: {
      type: String,
      enum: ["internal", "focused", "global"],
      default: "internal",
    },
    content: {
      type: String,
      required: [true, "Please provide listening content"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ListeningSchema.virtual("createdAt_formatted").get(function () {
  //   return this.createdBy;
  return DateTime.fromJSDate(this.createdAt).toISODate();
});

module.exports = mongoose.model("Listening", ListeningSchema);
