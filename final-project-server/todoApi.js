const express = require("express")
const app = express();
const fileSystem = require("fs");

var readList = fileSystem.readFileSync(__dirname + "/listTodo.json", 'utf8');
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Credentials", "true" );
    next();
});

app.get('/lists', (Request, Response) => {
    //console.log(Request.body);

    Response.end(readList);

})

// post data 
app.post('/lists', (Request, Response) => {



    var readList = fileSystem.readFileSync(__dirname + "/listTodo.json", 'utf8');
    readList = JSON.parse(readList);


    Response.writeHead(200, {
        "content-type": "application/json"
    })
    //console.log(Request.body);
    var data = (Request.body);

    readList.push(data)

    fileSystem.writeFileSync('listTodo.json', JSON.stringify(readList, ' ', 3));
    //console.log(readList);



    Response.end();

})

////////////


app.delete('/lists', (Request, Response) => {

    var readList = fileSystem.readFileSync(__dirname + "/listTodo.json", 'utf8');
    readList = JSON.parse(readList);
    var newData = (Request.body);
  
////////////delete particular place
    readList.forEach(element => {
    
    if (element.id == newData.id) {
       
            readList = readList.filter(element => element.id != newData.id);
    }
})


////////clear whole todo list
     if ("clearAll" == newData.id) {
        readList = [];
    }

    fileSystem.writeFileSync('listTodo.json', JSON.stringify(readList, '', 3));
    Response.end(JSON.stringify(readList, '', 3));

})

app.put('/lists', (Request, Response) => {

    var readList = fileSystem.readFileSync(__dirname + "/listTodo.json", 'utf8');
    readList = JSON.parse(readList);
    var newData = (Request.body);

    Response.writeHead(200, {
        "content-type": "application/json"
    })
    //console.log(newData.id);
    readList.forEach(element => {
    
        if (element.id == newData.id)
        {
            //console.log(element.task);
            //console.log(newData.task);
            element.task = newData.task;
        }
    })

    fileSystem.writeFileSync('listTodo.json', JSON.stringify(readList, ' ', 3));
    Response.end(JSON.stringify(readList));
})

////////////////
module.exports = {
    readList
}
// start the port
app.listen('8000', () => {
    console.log('working');

});