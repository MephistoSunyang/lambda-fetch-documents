const _ = require("lodash");

exports.asyncPool = async function asyncPool(
  iterable,
  iterator,
  concurrency = 20
) {
  const responses = [];
  let tasks = Promise.resolve();
  _.chain(iterable)
    .chunk(concurrency)
    .each((chunkedIterable) => {
      tasks = tasks
        .then(() => {
          return Promise.all(_.map(chunkedIterable, iterator));
        })
        .then((chunkedResponses) => {
          responses.push(...chunkedResponses);
        });
    })
    .value();
  await tasks;
  return responses;
};

exports.getErrorMessage = function (error) {
  return JSON.stringify(error, Object.getOwnPropertyNames(error));
};
