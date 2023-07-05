/* eslint-disable require-jsdoc */
const {save, remove, edit, getAll, get,
} = require('../services/bookshelfServices');


function saveBook(req, h) {
  const body = req.payload;
  try {
    const id = save(body);
    const response = h.response({
      'status': 'success',
      'message': 'Buku berhasil ditambahkan',
      'data': {
        'bookId': id,
      },
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      'status': 'fail',
      'message': error.message,
    });
    response.code(400);
    return response;
  };
}

function getBooks(req, h) {
  const queryParams = Object.entries(req.query);
  const books = getAll(queryParams);
  const response = h.response({
    'status': 'success',
    'data': {
      books,
    },
  });
  response.code(200);
  return response;
}

function getBook(req, h) {
  const {bookId} = req.params;
  const book = get(bookId);
  if (book == undefined) {
    const response = h.response({
      'status': 'fail',
      'message': 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
  }
  const response = h.response({
    'status': 'success',
    'data': {book},
  });
  response.code(200);
  return response;
}

function editBook(req, h) {
  const body = req.payload;
  const {bookId} = req.params;
  try {
    if (edit(bookId, body)) {
      const response = h.response({
        'status': 'success',
        'message': 'Buku berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      'status': 'fail',
      'message': 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  } catch (error) {
    const response = h.response({
      'status': 'fail',
      'message': error.message,
    });
    response.code(400);
    return response;
  }
}

function removeBook(req, h) {
  const {bookId} = req.params;
  if (remove(bookId)) {
    const response = h.response({
      'status': 'success',
      'message': 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  };
  const response = h.response({
    'status': 'fail',
    'message': 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = {saveBook, getBooks,
  getBook, editBook, removeBook};
