import jwt_decode from "jwt-decode";

const Redirect = async (userID, navigate) => {
  const retreiveGroup = jwt_decode(userID);
  console.log("🚀 ~ Redirect ~ retreiveGroup:", retreiveGroup);
  // console.log( "aqui entro " ,userID);
  //   const id = localStorage.getItem("userID");
  if (
    "Client" === retreiveGroup["cognito:groups"][0] ||
    "Admin" === retreiveGroup["cognito:groups"][0]
  ) {
    console.log("ko");
    navigate("/home");
  } else {
    console.log("🚀 ~ Redirect ~ error:", "ene el errror");

    navigate("/");
  }
};

export default Redirect;
