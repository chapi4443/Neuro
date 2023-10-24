import axios from "axios";

export const UpdateUser  = async (data) => {
  //     email,
    // password,
    // first_name,
    // last_name,
    // date_of_birth,
    // phone_number,
    // address,
    // city,
    // age, 
    // gender,
    // country,
  const useData = await axios.post("http://localhost:5000/api/v1/users/updateuser", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(useData);
  if (useData.status === 201) {
    window.location.href = "/login";
  } else {
    window.location.href = "/register";
  }
};