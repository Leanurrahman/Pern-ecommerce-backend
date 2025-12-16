const express = require('express');
const app = express();

app.get('/categories', (req, res) => {
    res.send('Category read');
});

app.post('/categories', (req, res) => {
    res.send('Category created');
});

app.patch('/categories', (req, res) => {
    res.send('Category updated');
});

app.delete('/categories', (req, res) => {
    res.send('Category deleted');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});