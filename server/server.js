const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }
  
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/'));
  })

app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`App listening on localhost:${PORT}`));
});