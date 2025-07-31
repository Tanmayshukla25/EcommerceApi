import express from"express";
import cors from "cors";
import  "dotenv/config"
import connectToDB from "./config/db.js"
import productRouter from "./routes/productsRoutes.js"         
import userRouter from "./routes/userRoutes.js"
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./swagger.js";
// import "dotenv/config"
import cookieParser from 'cookie-parser';


// dotenv.config();

const app =express()
const port = process.env.PORT

app.use(
    cors({
        origin :process.env.FRONTEND_URL,
        method:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
                                                                        

app.use("/product",productRouter)
app.use("/user",userRouter)






connectToDB()

app.listen(port ,()=>{
    console.log(`Server running at port ${port}`);
    
})
