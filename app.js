const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/video', (req, res) => {
    console.log('Request received:', req.method, req.url);
    console.log('Headers:', req.headers);
    res.end();
    });
app.listen(3000);