const express= require('express');
const path = require('path');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const app= express();
const itemsRouter = require('./routes/items');
const usersRouter = require('./routes/users');


mongoose.connect("mongodb+srv://farghaly:farghaly_93@cluster0-i8la2.mongodb.net/E-shop",{ useNewUrlParser: true,  useUnifiedTopology: true  })
.then(() => {
  console.log('Connected successfully to database..');
}
).catch(()=>{
  console.log('Connection failed ... !');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join(__dirname,'images')));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
}); 

app.use(itemsRouter);
app.use(usersRouter);



// app.use('/', express.static(path.join(__dirname, 'frontend')));

// //app.use(expressValidator);


// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });


module.exports = app;

