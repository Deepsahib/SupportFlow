import app from "./app.js";
import { connectDatabase } from "./config/db.js";

async function startServer(){
    await connectDatabase();
    app.listen(3000,()=>{
        console.log("server has been runnig successfully");
    })
}
startServer();