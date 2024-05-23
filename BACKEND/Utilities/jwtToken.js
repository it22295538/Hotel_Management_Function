import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET; 

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw error;
  }
}

export function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token missing" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; 
    next(); 
  } catch (error) {
    console.error("Error during token verification:", error);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
}



