// https://www.sitepoint.com/ajaxjquery-getjson-simple-example/

//---------------------------------------------display data------------------------------------------------------
exports.linegraph = function(req, res){
    var fs = require('fs');
    var userId = req.session.userId; 
    if(userId == null){
        res.redirect("/login");
        return;
    }
    var sql="SELECT dev_id FROM `users` WHERE `id`='"+userId+"'";   
           
    db.query(sql, function(err, result){
        var uuid = result[0]['dev_id'];
        var sql1="SELECT epoch_time, channel, watts FROM (SELECT * FROM sensordata WHERE device_id = '" + uuid + "' ORDER BY id DESC LIMIT 12000) sub ORDER BY id ASC";
        db.query(sql1, function(err, json_data){
        //    res.render('showdata.ejs',{data:json_data}); 
            json_data = JSON.stringify(json_data);
//            console.log(json_data);
            fs.writeFile('./public/json/test.json', json_data, function(err) {
                if(err) {
                    return console.log(err);
                }
            
                console.log("The file was saved!");
                res.render('chart.ejs');
            });  
                    
        });
    });   
       
};            


