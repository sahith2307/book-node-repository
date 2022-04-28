const bookSchema = require("../Schemas/bookSchema");

exports.getAllBooks = async (req, res, next) => {
  const notes = await bookSchema.find({ createdBy: req.user.id });
  res.status(200).json(notes);
};

exports.postBook = async (req, res, next) => {
  const note = new bookSchema(req.body);

  note.createdBy = req.user.id;
  note.author = req.user.userName;
  try {
    const noted = await note.save();
    res.status(201).json(noted);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
exports.getBookById = async (req, res, next) => {
  const { bookId } = req.params;
  try {
    const singleNote = await bookSchema.find({ _id: bookId });
    res.status(200).json(singleNote);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
exports.updateBook = async (req, res, next) => {
  const { bookId } = req.params;
  const note = req.body;
  note.author = req.user.userName;
  try {
    await bookSchema.findByIdAndUpdate(bookId, note);
    res.status(200).json({ success: `updated ${note.title} successfully` });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
exports.deleteBook = async (req, res, next) => {
  const { bookId } = req.params;

  try {
    await bookSchema.findByIdAndRemove(bookId);
    res.status(200).json({ success: `deleted ${bookId}` });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};
