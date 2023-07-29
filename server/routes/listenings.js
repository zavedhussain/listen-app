const express = require("express");
const {
  getAllListenings,
  createListening,
  deleteListening,
} = require("../controllers/listenings");
const router = express.Router();

router.route("/").get(getAllListenings).post(createListening);
router.route("/:listeningId").delete(deleteListening);
module.exports = router;
