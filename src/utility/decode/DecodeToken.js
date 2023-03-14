import jwt_decode from "jwt-decode";

const DecodeToken = (token) => {
  console.log("entro al decode");

  const decoded = jwt_decode(token);
  const role = decoded["cognito:groups"][0];
  const userID = decoded.username;
  return { userID, role };
};

export default DecodeToken;
