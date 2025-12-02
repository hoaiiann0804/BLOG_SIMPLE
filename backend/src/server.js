require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 8888;


const StartServer = ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT} `)
    })

}
StartServer()