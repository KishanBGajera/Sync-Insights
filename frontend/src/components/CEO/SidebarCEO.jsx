import { NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdAnalytics } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { GrScheduleNew } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import "../../style/Sidebar.css";
import { AuthContext } from "../../store/AuthContext";
import { logoutUser } from "../../Global/apiCall";
import { useState, useContext, useEffect } from "react";
import { RoleData } from "../../global/apiCall.jsx";

const SidebarCEO = () => {
  const { Details, logout } = useContext(AuthContext);
  const [role, setRole] = useState([]);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await RoleData();
        console.log(response2.data);
        setRole(response2.data);
      } catch (error) {
        console.error(
          "Error while retrieving data from department and role",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Details && Details.role_id) {
      const foundRole = role.find(item => item._id === Details.role_id);
      if (foundRole) {
        setData(foundRole.role_name);
      }
    }
  }, [role, Details]);
  
  const item = [
    {
      img: <BiSolidDashboard style={{ fontSize: "20px" }} />,
      text: "Dashboard",
      path: "/ceo/dashboard",
    },
    {
      img: <IoMdAnalytics style={{ fontSize: "20px" }} />,
      text: "Analytics",
      path: "/ceo/analytics",
    },
    {
      img: <FaFileInvoiceDollar style={{ fontSize: "20px" }} />,
      text: "Invoice",
      path: "/ceo/invoice",
    },
    {
      img: <GrScheduleNew style={{ fontSize: "20px" }} />,
      text: "Schedule",
      path: "/ceo/Schedule",
    },
    {
      img: <IoIosNotifications style={{ fontSize: "20px" }} />,
      text: "Notification",
      path: "/ceo/notification",
    },
    // { img: <IoSettings style={{ fontSize: '20px' }} />, text: 'Setting', path: '/ceo/setting' },
  ];

  const handleLogout = () => {
    logoutUser();
    logout();
    window.location.href = "/";
  };

  return (
    <div className="sidebar-container">
      <div className="sidebarmenu">
        <div className="sidebar-header">
          <img src="/Syn_logo.png" alt="Sync Insights" width={65} />
          <h5 style={{ fontWeight: "600" }}>Sync Insights</h5>
        </div>
        <div className="sidebar-listcontainer">
          <ul style={{ position: "relative" }}>
            {item.map((item, index) => (
              <li className="sidebar-list" key={index}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "#605bff" : "#9a9a9a",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  })}
                >
                  {item.img}
                  {item.text}
                </NavLink>
              </li>
            ))}
            <li className="sidebar-list-bottom">
              <img
                className="avatar"
                src={`https://ui-avatars.com/api/?name=${Details?.first_name}+${Details?.last_name}`}
                alt="Avatar"
              />
              <p style={{ fontSize: "10px" }}>
                <span style={{fontSize:"12px",fontWeight:500}}>{Details?.first_name}</span> <br />
                {data}
              </p>
              <IoLogOut
                onClick={handleLogout}
                style={{ fontSize: "25px", cursor: "pointer" }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarCEO;
