import jwt from "jsonwebtoken";
import 'dotenv/config';



export function checkToken(req, res, next) {
    const token = req.cookies.userToken;

    console.log(token);
    
    if (!token ) return res.status(401).send({ message: "No Token Found" });
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.User = decoded.id;
        console.log(decoded.id);
        console.log(req.User);
        

        next();
    }
    catch (error) {
        return res.status(402).json({ message: "Invalid or expired token" });
    }
}

export default checkToken;