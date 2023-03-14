import jwt_decode from "jwt-decode";

const Redirect = async (userID, navigate) => {
  const retreiveGroup = jwt_decode(userID);
  // console.log( "aqui entro " ,userID);
  //   const id = localStorage.getItem("userID");
  if (
    "Client" === retreiveGroup["cognito:groups"][0] ||
    "Admin" === retreiveGroup["cognito:groups"][0]
  ) {
    console.log("ko");
    navigate("/home");
  } else {
    navigate("/");
  }
};

export default Redirect;
