import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // This creates the token with the user's ID encoded inside
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // The token will stay valid for 30 days
  });

  // Since your frontend uses localStorage, we just return the token string!
  return token;
};

export default generateToken;
