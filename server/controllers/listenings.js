const { StatusCodes } = require("http-status-codes");
const Listening = require("../models/Listening");
const { NotFoundError, BadRequestError } = require("../errors");
const { DateTime } = require("luxon");

const getAllListenings = async (req, res) => {
  //setup query filters
  const { level, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };

  if (level && level !== "all") {
    queryObject.level = level;
  }

  //query
  let result = Listening.find(queryObject);

  //setup sorting
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  //count total pages and documents
  const limit = 3;
  const totalListenings = await Listening.countDocuments(queryObject).exec();
  const numOfPages = Math.ceil(totalListenings / limit);

  //setup pagination
  const page = Number(req.query.page);
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const listenings = await result.exec();
  res.status(StatusCodes.OK).json({ listenings, totalListenings, numOfPages });
};

const createListening = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const listening = await Listening.create(req.body);
  res.status(StatusCodes.CREATED).json({ listening });
};

//use below code for single record per day

// const createListening = async (req, res) => {
//   let start = DateTime.now()
//     .setZone("America/New_York")
//     .startOf("day")
//     .toJSDate();

//   let end = DateTime.now().setZone("America/New_York").endOf("day").toJSDate();

//   const existingListening = await Listening.find({
//     createdAt: { $gte: start, $lt: end },
//     createdBy: req.user.userId,
//   });

//   if (existingListening.length > 0) {
//     throw new BadRequestError("Record already created for the day");
//   }

//   req.body.createdBy = req.user.userId;
//   const listening = await Listening.create(req.body);
//   res.status(StatusCodes.CREATED).json({ listening });
// };

const deleteListening = async (req, res) => {
  const { userId } = req.user;
  const { listeningId } = req.params;
  const deletedListening = await Listening.findOneAndDelete({
    _id: listeningId,
    createdBy: userId,
  }).exec();

  if (!deletedListening) {
    throw new NotFoundError("Listening does not exist");
  }
  res.status(StatusCodes.OK).json("Deleted Successfully");
};

module.exports = { getAllListenings, createListening, deleteListening };
