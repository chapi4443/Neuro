import axios from "axios";

export const UpdateUser = async (data) => {
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
  // console.log(data);
  const useData = await axios.patch(
    "http://localhost:5000/api/v1/users/updateuser",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(useData);
  window.location.reload(true)
};

export const getUser = async (data) => {
  const useData = await axios.get(
    `http://localhost:5000/api/v1/users/${data}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return useData.data;
};

export const UpdateUserpasswordandEmail = async (data) => {
  //     email,
  // password,
  // console.log(data);
  const useData = await axios.patch(
    "http://localhost:5000/api/v1/users/updateUserPassword",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(useData);
  window.location.reload(true);
};

