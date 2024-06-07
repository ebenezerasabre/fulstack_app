const app = require('./app');
const { port } = require('./src/config/server.config');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
