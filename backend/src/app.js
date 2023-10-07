const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.listen(app.get('port'), () => {
    console.log('Server is up on port 3000');
    });





