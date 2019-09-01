const db = require('../model/modal');
module.exports = {
    getLogin:async function(req,res){
        var response = [];
        var col = "*";
        var col1 = ['asda','adafaf'];
        var where = "asdadad = 'data'";
        var where1 = {
            "asd":"ada",
            "adaf":"adfafa"
        };
        var data = [{
            "dataT":"data",
            "KeyT":"Keydata"
        },{
            "dataT":"data1",
            "KeyT":"Keydata1"
        }]
        await db.select(col,"summa",where).then(function(result){
            response.push(result);
        });
        await db.select(col1,"summa",where1).then(function(result){
            response.push(result);
        });
        await db.insert(data,"summa").then(function(result){
            response.push(result);
        });
        await db.update(where1,"summa",null).then(function(result){
            response.push(result);
        });
        await db.delete("summa","data").then(function(result){
            response.push(result);
        });
        res.json(response);
    }
}
