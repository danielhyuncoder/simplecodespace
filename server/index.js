const {cors_addresses} = require('./variables')

const io = require('socket.io')(4000, {
    cors:{
        origin: cors_addresses
    }
})
require('dotenv').config()
io.on('connection', (socket)=>{
    socket.on("code_change", (code,id) => {
        io.sockets.emit("code_change/"+id, code);
    });
    socket.on('code_run', (code, id, lang)=>{
        fetch('https://glot.io/api/run/'+lang+'/latest', {method: "POST", headers: {'Authorization': process.env.KEY,'Content-Type': 'application/json'}, body:JSON.stringify({files: [                                                                                         {
            name: "main."+lang,
            content:code
              }
        ]})}).then(res=>{
res.json().then(data=>{
    io.sockets.emit("code_run/"+id, data);
})
})
    })
})