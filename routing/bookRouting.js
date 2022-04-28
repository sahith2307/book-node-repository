const express = require("express");
const router = express.Router();
const bookController = require("../controlAPI/bookControl");
router
  .route("/users")
  .get(bookController.getAllBooks)
  .post(bookController.postBook);
router
  .route("/users/:bookId")
  .get(bookController.getBookById)
  .put(bookController.updateBook)
  .delete(bookController.deleteBook);

// router.get();
// router.post();
// router.put();
// router.delete();
module.exports = router;
