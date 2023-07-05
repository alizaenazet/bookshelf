const {nanoid} = require('nanoid');
const data = new Map();
/* eslint-disable require-jsdoc */
function save(body) {
  if (!body.name) throw Error('Gagal menambahkan buku. Mohon isi nama buku');
  // eslint-disable-next-line max-len
  if (body.readPage > body.pageCount) throw Error('Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount');
  const {name, year, author,
    summary, publisher, pageCount,
    readPage, reading} = body;
  let finished = false;
  if (readPage == pageCount) {
    finished = true;
  }
  const id = nanoid(8);
  const bookTemp = new Book(id, name, year, author, summary,
      publisher, pageCount, readPage, finished, reading);
  data.set(id, bookTemp);
  return id;
}

function getAll(queryParams) {
  const books = [];
  if (queryParams.length > 0) {
    const eventBooks = queryParams.map(([key, value]) =>
      getDataByProperty(key, value));
    books.push(...eventBooks[0]);
    return books;
  }

  for (const book of data.values()) {
    books.push(book.getSomeProps());
  }
  return books;
}

function get(bookId) {
  const book = data.get(bookId);
  return book;
}


function edit(bookId, body) {
  if (!body.name) throw Error('Gagal memperbarui buku. Mohon isi nama buku');
  // eslint-disable-next-line max-len
  if (body.readPage > body.pageCount) throw Error('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
  const book = data.get(bookId);
  if (book == undefined) return false;
  book.editProps(body);
  data.set(bookId, book);
  return true;
}

function remove(bookId) {
  return (data.delete(bookId));
}

function getDataByProperty( propertyName, propertyValue) {
  const book = [];
  switch (propertyName) {
    case 'name':
      for (const value of data.values()) {
        if (value.name.toLowerCase().includes(propertyValue.toLowerCase())) {
          book.push(value.getSomeProps());
        }
      }
      break;

    case 'reading':
      if (propertyValue === '1') {
        for (const value of data.values()) {
          if (value.reading) {
            book.push(value.getSomeProps());
          }
        }
        break;
      }
      for (const value of data.values()) {
        if (!value.reading) {
          book.push(value.getSomeProps());
        }
      }
      break;

    case 'finished':
      if (propertyValue === '1') {
        for (const value of data.values()) {
          if (value.finished) {
            book.push(value.getSomeProps());
          }
        }
        break;
      }
      for (const value of data.values()) {
        if (!value.finished) {
          book.push(value.getSomeProps());
        }
      }
      break;
    default:
      throw Error('invalid query');
  }
  return book;
}

class Book {
  constructor(id, name, year, author,
      summary, publisher, pageCount,
      readPage, finished, reading) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.finished = finished;
    this.reading = reading;
    this.insertedAt = new Date().toISOString();
    this.updatedAt = this.insertedAt;
  }
  getProps() {
    return {
      id: this.id,
      name: this.name,
      year: this.year,
      author: this.author,
      summary: this.summary,
      publisher: this.publisher,
      pageCount: this.pageCount,
      readPage: this.readPage,
      finished: this.finished,
      reading: this.reading,
      insertedAt: this.insertedAt,
      updatedAt: this.updatedAt,
    };
  }
  getSomeProps() {
    return {
      id: this.id,
      name: this.name,
      publisher: this.publisher,
    };
  }
  editProps(props) {
    const {name, year, author, summary, publisher
      , pageCount, readPage, reading} = props;
    this.name = name;
    this.year = year;
    this.author = author;
    this.summary = summary;
    this.publisher = publisher;
    this.pageCount = pageCount;
    this.readPage = readPage;
    this.reading = reading;
    if (pageCount === readPage) {
      this.finished = true;
    }
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = {save, getAll, get, edit, remove};
