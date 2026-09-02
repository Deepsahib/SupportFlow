import app from "./app.js";
import { connectDatabase } from "./config/db.js";


async function startServer(){
   try {
    await connectDatabase();
    app.listen(process.env.PORT,()=>{
        console.log("server is runnig at port 4000");
    })
   } catch (error) {
     console.error("There has been error connecting to the server or what")
}
}
startServer();