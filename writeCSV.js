const models = require('./models');
const ObjectsToCsv = require('objects-to-csv');

const usersCSV = async () => {
  const _users = await models.User.findAll({
    order: [['username']],
  });
  const users = [];
  _users.map((user) => {
    users.push({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
  const csv = new ObjectsToCsv(users);
  await csv.toDisk('expectedResult1.csv');
};

const bookCSV = async () => {
  const _books = await models.Book.findAll();
  const books = [];
  _books.map((book) => {
    books.push({
      id: book.id,
      title: book.title,
      author: book.author,
    });
  });

  const csv = new ObjectsToCsv(books);
  await csv.toDisk('expectedResult2.csv');
};

const usersAfterMigrationCSV = async () => {
  const _users = await models.User.findAll({
    order: [['username']],
  });
  const users = [];
  _users.map((user) => {
    users.push({
      id: user.id,
      username: user.username,
      email: user.email,
      age: user.age,
    });
  });
  const csv = new ObjectsToCsv(users);
  await csv.toDisk('userAfterMigration.csv');
};

const bookAfterMigrationCSV = async () => {
  const _books = await models.Book.findAll();
  const books = [];
  _books.map((book) => {
    books.push({
      id: book.id,
      title: book.title,
      author: book.author,
      availability: book.availability
    });
  });

  const csv = new ObjectsToCsv(books);
  await csv.toDisk('./expect/bookAfterMigration.csv');
};

module.exports = {
  usersCSV,
  bookCSV,
  usersAfterMigrationCSV,
  bookAfterMigrationCSV,
};
