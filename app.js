const help = require('./writeCSV');
const queriesBefore = require('./queriesBeforeMigrations');
const queriesAfter = require('./queriesAfterMigrations');

const models = require('./models');
const logs = require('./writeLogs');

const addUser = async () => {
  await models.User.create({
    username: 'test2',
    email: 'test1',
  });
};

const addBook = async () => {
  await models.Book.create({
    title: 'title103',
    author: 'author16'
  })
};

//addUser();
//addBook();

//help.usersCSV();
//help.bookCSV();

//help.usersAfterMigrationCSV()
//help.bookAfterMigrationCSV()

//queriesBefore.orderByUsers();
//queriesBefore.selectBooks();

//queriesAfter.orderByUsers();
queriesAfter.selectBooks()