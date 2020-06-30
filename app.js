const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3300;
// const path = require('path');

app.use(express.urlencoded({extended: false}));

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/form', (req, res, next) => {
    res.send(`<html>
                    <form action="/thank-you" method="POST">
                        <input type="text" name="username" />
                        <button type="submit">Submit</button>
                    </form>
                </html>`);
    // res.sendFile('C:/Users/ravi/Desktop/expressDemo/views/formPage.html');
    // const viewPathForForm = path.join(__dirname, 'views', 'formPage.html');
    // res.sendFile(viewPathForForm);
});

app.post('/thank-you', (req, res, next) => {
    res.send(req.body);
    // res.json(req.body);
})

app.get('/', (req, res, next) => {
    res.send('Hello Zycus');
});

app.use((req, res, next) => {
    res.status(404).send('<html><h1>Whoa! Page Not Found</h1></html>');
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

app.listen(PORT, () => console.log(`Server connected succesfully on ${PORT}`));