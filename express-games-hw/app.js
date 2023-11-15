const express = require('express');
const logger = require('morgan');
const gameRouter = require('./routes/gameRouter');
const mainRouter = require('./routes/indexRouter')
const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use('/', mainRouter);
app.use('/api/game', gameRouter)

app.listen(3000, ()=>{
    console.log('Server started on port 3000.');
})

