const mysql=require('mysql');
const express=require('express');
const bodyparser=require('body-parser');


var app=express();
var methodOverride = require('method-override');
app.use(express.json());
var path=require('path');
const router=express.Router();
app.use(methodOverride('_method',{ methods: ['POST','GET'] }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
 
router.get('/',function(req,res){
    res.sendfile(path.join(NODEJS+'/index.html'));
});



var mysqlconnection=mysql.createConnection({
    host:'northside.in',
    user:'shakir',
    password:'shakir123',
    database:'shakir_test'
});
mysqlconnection.connect((err)=>{
    if(!err)
    console.log('DB CONNECTION IS SUCCEDED');
    else
    console.log('db connection failed \n error:'+JSON.stringify(err,undefined,2));
});

app.get('/employee',(req,res)=>{
    mysqlconnection.query('SELECT *from balakiruthika',(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});



app.get('/employee/:id',(req,res)=>{
    //var params=req.body;
    //console.log(params);
    mysqlconnection.query('SELECT *from balakiruthika WHERE id=?',[req.query.id],(err,rows,fields)=>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

//delete
app.delete('/employee/delete/:id',(req,res)=>{
    mysqlconnection.query('DELETE from balakiruthika WHERE id=?',[req.body.id],(err,rows,fields)=>{
        if(!err)
        res.send("Deleted successfully");
        else
        console.log(err);
    });
    res.send("Deleted successfully");
});


app.post('/employee/add',(req,res)=>{

    mysqlconnection.query("INSERT INTO balakiruthika SET id=?,`name`=? ",[req.body.id,req.body.name],function (err,rows,fields){
        a=[]
        x=a.push(rows)
                if (x.length>0) {
                   
        
                    res.end( + '<h2>inserted</h2>')
        
                }
        
                res.end( 'alredy exited');
            }); 
  
});


app.put('/employee/put/:id',function(req,res){
    mysqlconnection.query('update balakiruthika set name=? where id=?',[req.body.name,req.body.id],function(err,results,fields){
        if(!err)
        res.send("Updated successfully");
        else
        res.send(err);
    
    res.end(JSON.stringify(results));
});

});



app.listen(3000,()=>console.log('express server is runnig at port no:3000'))

