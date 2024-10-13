const BASE_URI = "http://localhost:8080/api/";

const apiKeys = {
  login: `${BASE_URI}user/login`,
  logout: `${BASE_URI}user/logout`,
  insert_user:`${BASE_URI}user/create`,
  get_department:`${BASE_URI}department/all`,
  get_role:`${BASE_URI}role/all`,
  get_user:`${BASE_URI}user/all`,
  insert_task:`${BASE_URI}task/create`,
  get_task:`${BASE_URI}task/all`,
  get_all_task:`${BASE_URI}task/all`,
  update_status:`${BASE_URI}task/update/status`,
  departmentname_by_id:`${BASE_URI}department/name`,
  task_by_department_id:`${BASE_URI}task/all/department`,
};

export { BASE_URI, apiKeys };
