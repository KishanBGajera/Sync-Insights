const BASE_URI = "http://localhost:8080/api/";

const apiKeys = {
  login: `${BASE_URI}user/login`,
  logout: `${BASE_URI}user/logout`,
  insert_user:`${BASE_URI}user/create`,
  get_department:`${BASE_URI}department`,
  get_role:`${BASE_URI}role`,
};

export { BASE_URI, apiKeys };
