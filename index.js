var express = require('express');

var app = express();
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.send('...');
})

app.listen(3001, function(){
    console.log('app running');
});
