const express = require('express');
const app = express();

require('./routes')(app, express);

const port = process.env.PORT || 5000;

app.listen(port);
