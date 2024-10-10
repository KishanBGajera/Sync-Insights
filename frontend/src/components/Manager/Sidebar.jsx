import { NavLink } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdAnalytics } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import "../../style/Sidebar.css";
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { logoutUser } from "../../Global/apiCall";

const Sidebar = () => {
  const { Details, logout } = useContext(AuthContext);
  // const item = [
  //     { img: <BiSolidDashboard style={{ fontSize: '20px' }} />, text: 'Dashboard', path: '/insights/dashboard' },
  //     { img: <IoMdAnalytics style={{ fontSize: '20px' }} />, text: 'Analytics', path: '/insights/analytics' },
  //     { img: <FaFileInvoiceDollar style={{ fontSize: '20px' }} />, text: 'Invoice', path: '/insights/invoice' },
  //     { img: <FaCalendarAlt style={{ fontSize: '20px' }} />, text: 'Calendar', path: '/insights/calendar' },
  //     { img: <IoIosNotifications style={{ fontSize: '20px' }} />, text: 'Notification', path: '/insights/notification' },
  //     { img: <IoSettings style={{ fontSize: '20px' }} />, text: 'Setting', path: '/insights/setting' },
  // ];
  const item = [
    {
      img: <BiSolidDashboard style={{ fontSize: "20px" }} />,
      text: "Employees",
      path: "/insights/dashboard",
    },
    {
      img: <FaCalendarAlt style={{ fontSize: "20px" }} />,
      text: "Calendar",
      path: "/insights/calendar",
    },
    {
      img: <FaFileInvoiceDollar style={{ fontSize: "20px" }} />,
      text: "Schedule",
      path: "/insights/schedule",
    },
    {
      img: <IoSettings style={{ fontSize: "20px" }} />,
      text: "Setting",
      path: "/insights/setting",
    },
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
              <p style={{ fontSize: "12px" }}>
                {Details?.first_name} <br />
                Employee
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

export default Sidebar;
