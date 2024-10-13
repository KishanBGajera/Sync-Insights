import axios from "axios";
import { BASE_URI, apiKeys } from "./apiKeys";

axios.create({
  baseURL: BASE_URI,
  headers: {
    "Content-Type": "application/json",
    'Accept': 'application/json'

  },

}); 

// eslint-disable-next-line no-undef
export const loginUser = (data) => axios.post(apiKeys.login, data,{ withCredentials: true });
export const logoutUser = () => axios.post(apiKeys.logout,{ withCredentials: true });
export const InsertUser = (data) => axios.post(apiKeys.insert_user, data,{ withCredentials: true });
export const createDepartment = (data) => axios.post(apiKeys.create_department, data,{ withCredentials: true });
export const DepartmentData = () => axios.get(apiKeys.get_department,{ withCredentials: true });
export const RoleData = () => axios.get(apiKeys.get_role,{ withCredentials: true });
export const UserData = () => axios.get(apiKeys.get_user,{ withCredentials: true });
export const InsertTask = (data) => axios.post(apiKeys.insert_task,data,{ withCredentials: true });
export const  GetAllTask= (data) => axios.get(apiKeys.get_task+"/"+data,{ withCredentials: true });
export const  GetTaskByDepartmentId= (data) => axios.get(apiKeys.task_by_department_id+"/"+data,{ withCredentials: true });
export const  GetDepartmentNameById= (data) => axios.get(apiKeys.departmentname_by_id+"/"+data,{ withCredentials: true });
export const  getAllTask= () => axios.get(apiKeys.get_all_task,{ withCredentials: true });
export const  UpdateTask= (data) => axios.put(apiKeys.update_status,data,{ withCredentials: true });