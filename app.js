const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const handlebars = require('express-handlebars');
const PORT = process.env.PORT || 3300;
// const path = require('path');

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/partials/'
}));


// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.send('Hello Zycus');
});

app.get('/form', (req, res, next) => {
    res.send(`<html>
                    <form action="/thank-you" method="POST">
                        <input type="text" name="username" />
                        <button type="submit">Submit</button>
                    </form>
                </html>`);
    // res.sendFile('C:/Users/ravi/Desktop/expressDemo/views/formPage.html');
    // const viewPathForForm = path.join(__d irname, 'views', 'formPage.html');
    // res.sendFile(viewPathForForm);
});

app.post('/thank-you', (req, res, next) => {
    res.send(req.body);
    // res.json(<html><h1>woohooo</h1></html>);
})

app.get('/params/:customParamOne/:customParamTwo', (req, res, next) => {
    res.send(req.params);
})

app.get('/query', (req, res, next) => {
    res.send(req.query);
})

app.get('/template', (req, res, next) => {
    res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExists: true, title: "List of suggested players"});
})

app.get('/errorhandler', (req, res, next) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => reject('whoa the promise failed :('), 2000);
    });
    promise
        .then()
        .catch(err => {
            // console.log(err);
            // throw new Error(err)
            const newErr = new Error(err);
            newErr.statusCode = 421;
            next(newErr);
        });
})

app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
      });
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
})

// Error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  });

app.listen(PORT, () => console.log(`Server connected succesfully on ${PORT}`));

const fakeApi = () => {
    return [
      {
        name: 'Katarina',
        lane: 'midlaner'
      },
      {
        name: 'Jayce',
        lane: 'toplaner'
      },
      {
        name: 'Heimerdinger',
        lane: 'toplaner'
      },
      {
        name: 'Zed',
        lane: 'midlaner'
      },
      {
        name: 'Azir',
        lane: 'midlaner'
      }
    ];
  }