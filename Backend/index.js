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

// app.use(
//     cors({
//         origin :process.env.FRONTEND_URL,
//         method:["GET","POST","PUT","DELETE"],
//         credentials:true,
//     })
// );

const allowedOrigins = [process.env.DEPLOYED_FRONTEND_URL];

const localhostRegex = /^(https:\/\/localhost:\d+|http:\/\/localhost:\d+)$/;

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      localhostRegex.test(origin)
    ) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true, 
};
app.use(cors(corsOptions))
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
