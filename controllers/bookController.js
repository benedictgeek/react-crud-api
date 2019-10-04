const Book = require("../models/index").book;
const { uploadFile } = require("../fileOperation/fileUploadHandler");
const { deleteFile } = require("../fileOperation/deleteFile");

module.exports.createBook = (req, res, next) => {
  const image = req.files.image;
  /**
   *@param {buffer file} image
   *@return {string} imageUrl (from uploadFile callback)
   *
   */
  uploadFile(res, image, imageUrl => {
    const { title, price, description, author } = req.body;
    const userId = req.user.id;

    Book.create({ title, price, description, author, userId, imageUrl })
      .then(result => {
        res.status(200).json({ status: 200, data: result });
      })
      .catch(err => {
        next(err);
      });
  });
};

module.exports.editBook = (req, res, next) => {
  const bookId = req.body.bookId;
  const price = req.body.price;
  const description = req.body.description;
  const author = req.body.author;

  Book.update(
    { price, description, author },
    { returning: true, where: { id: bookId } }
  )
    .then(([rowsUpdated, updatedBook]) => {
      res.status(200).json({ status: 200, bookData: updatedBook });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.deleteBook = (req, res, next) => {
  const bookId = req.params.bookId;
  Book.findOne({ where: { id: bookId } }).then(book => {
    if (!book) {
      const error = { message: "Book not found" };
      next(error);
    }
    const bookImageUrl = book.imageUrl;
    /**
     * @param {string} (file amazon url)
     * @returns {boolean} (callback from deleteFile function)
     */
    deleteFile(res, bookImageUrl, isDeleted => {
      if (isDeleted) {
        Book.destroy({ where: { id: bookId } })
          .then(result => {
            res.status(200).json({ result });
          })
          .catch(err => {
            next(err);
          });
      } else {
          next({status: 500, message:'Problem deleting file image, please try again'});
      }
    });
  });
};

module.exports.getBook = (req, res, next) => {
  const bookId = req.params.bookId;

  Book.findOne({ where: { id: bookId } }).then(book => {
    res.status(200).json({ status: 200, bookData: book });
  });
};

module.exports.getBooks = (req, res, next) => {
  if (!req.user) {
    res.status(200).json({ status: 401 });
  }
  Book.findAll().then(books => {
    res.status(200).json(books);
  });
};

module.exports.getUserBooks = (req, res, next) => {
  if (!req.user) {
    throw new Error("Some error occured");
  }

  Book.findAll({ where: { userId: req.user.id } }).then(userBooks => {
    res.status(200).json({ status: "Success", books: userBooks });
  });
};
