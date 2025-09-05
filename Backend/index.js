import express from "express";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./config/db.js";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import cookieParser from "cookie-parser";
import session from "express-session";  
import passport from "passport";         
import "./config/passport.js";          
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT || 4040;


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


app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret", 
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, 
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/auth", authRoutes);


connectToDB();


app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${port}`);
});
