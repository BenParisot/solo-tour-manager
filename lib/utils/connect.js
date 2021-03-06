const mongoose = require('mongoose');
const { parse } = require('url');

const redact = dbUri => {
  const parsedDbUri = parse(dbUri);
  const authPart = parsedDbUri.auth ? '***:***@' : '';

  return `${parsedDbUri.protocol}//${authPart}${parsedDbUri.hostname}:${parsedDbUri.port}${parsedDbUri.pathname}`;
};

const mongooseEvent = (event, dbUri) => {
  mongoose.connection.on(event, () => {
    // eslint-disable-next-line no-console
    console.log(`Connection to MongoDB ${event} at ${dbUri}`);
  });
};

module.exports = (dbUri = process.env.MONGODB_URI) => {
  const redactedDbUri = redact(dbUri);
  ['open', 'error', 'disconnected', 'reconnected']
    .forEach(event => mongooseEvent(event, redactedDbUri));

  return mongoose.connect(dbUri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  });
};
  
