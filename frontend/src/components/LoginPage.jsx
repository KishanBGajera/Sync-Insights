
import { IoMdClose } from "react-icons/io";
import { FaRegCopyright } from "react-icons/fa6";
// import logo from './logo.jpg';
import { Link } from "react-router-dom";
import '../style/LoginPage.css';
import { useContext, useState } from "react";
import { loginUser } from "../Global/apiCall";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [role,setRole]=useState([]);

  const getInfo = (i) => {
    // console.log(i.target.name, i.target.value);
    setUser({ ...user, [i.target.name]: i.target.value });
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response2 = await RoleData();
  //       console.log(response2.data);
  //       setRole(response2.data);
  //     } catch (error) {
  //       console.error(
  //         "Error while retrieving data from department and role",
  //         error
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);
  const handleLoginForm = (e) => {
    e.preventDefault();
    loginUser(user)
      .then((response) => {
        console.log(response.data.data);
        localStorage.setItem("Info", JSON.stringify(response.data.data));
        if(response.data.data.role_id=="6706715e74f0afc0bcfead3a"){
          window.location.href="/insights/dashboard"
        }
        else if(response.data.data.role_id=="6706718274f0afc0bcfead44"){
          window.location.href="/ceo/dashboard"
        }
        else{
          window.location.href="/employee/dashboard"
        }
      })
      .catch((error) => {
        // console.log(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div className="main-container-login">
      <div className="login-container">
        <div className="Name-container">
          <h2 className="name">Log in</h2>
        </div>
        <div className="form-container">
          <form className="form" method="post" onSubmit={handleLoginForm}>
            <label htmlFor="Emial">Username or email address</label>
            <input
              type="email"
              name="email"
              className="input"
              onChange={getInfo}
            />
            {/* <input type="email" name="Email" required
              className="input" /> */}
            <label htmlFor="password" >Password</label>
            <input
              type="password"
              name="password"
              className="input"
              onChange={getInfo}
            />
            {/* <input type="password" name="Password" required
              className="input" /> */}
            {/* <a className="forgot" href="#">Forgot password?</a> */}
            <div className="button">
              {/* <Link to="insight" className="Link"><button className="login">Login</button></Link> */}
              <button className="login" type="submit">Login</button>
            </div>

          </form>
        </div>
      </div>
      <div className="login-image-container">
        <img src="login.png" width={500} alt="" />
      </div>

      {/* <footer className="last">
            <span>Copyright <FaRegCopyright /> 2024 Sync Insights</span>
      </footer> */}

    </div>
  );
}

export default LoginPage;