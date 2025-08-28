// import express from"express";
// import cors from "cors";
// import  "dotenv/config"
// import connectToDB from "./config/db.js"
// import productRouter from "./routes/productsRoutes.js"         
// import userRouter from "./routes/userRoutes.js"
// import swaggerUi from 'swagger-ui-express'
// import swaggerSpec from "./swagger.js";
// // import "dotenv/config"
// import cookieParser from 'cookie-parser';
// import "./config/passport.js";
// import authRoutes from "./routes/authRoutes.js";
// import session from "express-session";   // 👈 ADD THIS
// import passport from "passport"; 
// // dotenv.config();

// const app =express()
// const port = process.env.PORT

// // app.use(
// //     cors({
// //         origin :process.env.FRONTEND_URL,
// //         method:["GET","POST","PUT","DELETE"],
// //         credentials:true,
// //     })
// // );

// const allowedOrigins = [process.env.DEPLOYED_FRONTEND_URL];

// const localhostRegex = /^(https:\/\/localhost:\d+|http:\/\/localhost:\d+)$/;

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (
//       !origin ||
//       allowedOrigins.includes(origin) ||
//       localhostRegex.test(origin)
//     ) {
//       return callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true, 
// };
// app.use(cors(corsOptions))
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());
// app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))
                                                                        

// app.use("/product",productRouter)
// app.use("/user",userRouter)
// app.use("/auth", authRoutes);






// connectToDB()

// app.listen(port ,()=>{
//     console.log(`Server running at port ${port}`);
    
// })
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./config/db.js";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import cookieParser from "cookie-parser";
import session from "express-session";   // ✅ added
import passport from "passport";         // ✅ added
import "./config/passport.js";           // your passport strategies (local + google)
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS config
const allowedOrigins = [process.env.DEPLOYED_FRONTEND_URL];
const localhostRegex = /^(https:\/\/localhost:\d+|http:\/\/localhost:\d+)$/;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
      return callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ express-session setup (required for passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret", // store securely in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true only in HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/auth", authRoutes);

// ✅ Connect to DB
connectToDB();

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running at port ${port}`);
});
