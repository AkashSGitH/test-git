const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const app = express();

app.use(cookieParser());
app.use(session({secret : "John", resave : true, saveUninitialized : true}))

app.get('/', (req, resp)=>{
    if(req.session.session1)
        resp.send("Session is available, " + req.session.session1);
    else{
        req.session.session1 = "expresscode"
        resp.send(req.session.session1 + " session is created");
    }

})

app.listen(8080, ()=>{
    console.log("Server running at 8080")
})