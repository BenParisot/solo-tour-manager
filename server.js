require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');

const PORT = process.env.PORT || 6666;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on ${PORT}`);
});
