const express = require('express');

const items = require('./routes/api/items')

const app = express();

app.get('/', (req, res) => res.send('Hello'));

//routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));