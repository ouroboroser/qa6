const fs = require('fs');

const writeLogs = (fileName, total, correct, failed) => {
  let data = `total data: ${total} \ncorrect data: ${correct} \nfailed data: ${failed}`;
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
};

module.exports = {
  writeLogs,
};
