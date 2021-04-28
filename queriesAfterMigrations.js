const csv = require('csv-parser');
const ObjectsToCsv = require('objects-to-csv');
const fs = require('fs');
const logs = require('./writeLogs');

const models = require('./models');

const orderByUsers = async () => {
  const data = await models.User.findAll({
    order: [['username']],
  });

  const realData = [];

  data.map((user) => {
    realData.push({
      id: String(user.id),
      username: user.username,
      email: user.email,
      age: String(user.age),
    });
  });

  const expectedResult = [];
  const finalResult = [];

  fs.createReadStream('userAfterMigration.csv')
    .pipe(csv())
    .on('data', (data) => expectedResult.push(data))
    .on('end', () => {
      console.log('done');
      //console.log(realData);
      //console.log(expectedResult);
      let total = 0;
      let correct = 0;
      let failed = 0;
      expectedResult.map((expect) => {
        realData.map((real) => {
          if (expect.id === real.id) {
            if (
              expect.username === real.username &&
              expect.email === real.email &&
              expect.age === real.age
            ) {
              finalResult.push(expect);
              finalResult.push(real);
              finalResult.push({
                id: 'test_result',
                username: 'correct',
                email: 200,
              });
              total++;
              correct++;
            }

            if (
              expect.username !== real.username ||
              expect.email !== real.email ||
              expect.age !== real.age
            ) {
              finalResult.push(expect);
              finalResult.push(real);
              finalResult.push({
                id: 'test_result',
                username: 'failed',
                email: 400,
              });

              total++;
              failed++;
            }
          }
        });
      });
      const csv = new ObjectsToCsv(finalResult);
      csv.toDisk('./result/finalUserAfter.csv');
      logs.writeLogs('./result/userLogsAfter.txt', total, correct, failed);
    });
};

const selectBooks = async () => {
  const data = await models.Book.findAll();

  const realData = [];

  data.map((book) => {
    realData.push({
      id: String(book.id),
      title: book.title,
      author: book.author,
      availability: String(1)
    });
  });

  const expectedResult = [];
  const finalResult = [];

  fs.createReadStream('./expect/bookAfterMigration.csv')
    .pipe(csv())
    .on('data', (data) => expectedResult.push(data))
    .on('end', () => {
      console.log('done');
      let total = 0;
      let correct = 0;
      let failed = 0;
      //console.log(realData)
      //console.log(expectedResult)
      expectedResult.map((expect) => {
        realData.map((real) => {
          if (expect.id === real.id) {
            if (expect.title === real.title && expect.author === real.author && expect.availability === real.availability) {
              finalResult.push(expect);
              finalResult.push(real);
              finalResult.push({
                id: 'test_result',
                title: 'correct',
                author: 200,
              });
              total++;
              correct++;
            }

            if (expect.title !== real.title || expect.author !== real.author || expect.availability !== real.availability) {
              finalResult.push(expect);
              finalResult.push(real);
              finalResult.push({
                id: 'test_result',
                title: 'failed',
                author: 400,
              });
              total++;
              failed++;
            }
          }
        });
      });
      const csv = new ObjectsToCsv(finalResult);
      csv.toDisk('./result/after/finalBookAfter.csv');
      logs.writeLogs('./result/after/bookLogs.txt', total, correct, failed);
    });
};

module.exports = {
  orderByUsers,
  selectBooks
};
