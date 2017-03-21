var express = require('express');
var bodyParser = require('body-parser');
var yCurrency = require('y-currency');
var countries = require('countries-list');
var port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/getCountries',function(req,res){
    var obj = [];
    var keys= Object.keys(countries['countries']);
    keys.forEach(function(key){
         obj.push({
            name:countries['countries'][key]['name'],
            currency:countries['countries'][key]['currency']
        })
    })
    res.send(obj);
});


app.post('/', function (req, res) {

    var reqValue = req.body.value;
    var convertFrom = req.body.from;
    var convertTo = req.body.to;
    if (reqValue != null && convertFrom != null && convertTo != null) {
        yCurrency
            .convert(parseInt(reqValue), convertFrom, convertTo, function (err, converted) {
                if (err) {
                    res
                        .status('500')
                        .send(err);
                } else{
                res.status('200').send({result: converted});
                }
            });
    }else{
        res.status('400').send('please check the perameters, something is missing');
    }

})

app.listen(port, function () {
    console.log('server is now connected on ' + port);
});