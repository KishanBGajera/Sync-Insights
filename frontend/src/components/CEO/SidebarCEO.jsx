import { NavLink } from 'react-router-dom';
import { BiSolidDashboard } from "react-icons/bi";
import { IoMdAnalytics } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { GrScheduleNew } from "react-icons/gr";
import { IoSettings } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import '../../style/Sidebar.css';

const SidebarCEO = () => {
    const item = [
        { img: <BiSolidDashboard style={{ fontSize: '20px' }} />, text: 'Dashboard', path: '/ceo/dashboard' },
        { img: <IoMdAnalytics style={{ fontSize: '20px' }} />, text: 'Analytics', path: '/ceo/analytics' },
        { img: <FaFileInvoiceDollar style={{ fontSize: '20px' }} />, text: 'Invoice', path: '/ceo/invoice' },
        { img: <GrScheduleNew style={{ fontSize: '20px' }} />, text: 'Schedule', path: '/ceo/Schedule' },
        { img: <IoIosNotifications style={{ fontSize: '20px' }} />, text: 'Notification', path: '/ceo/notification' },
        // { img: <IoSettings style={{ fontSize: '20px' }} />, text: 'Setting', path: '/ceo/setting' },
    ];
    return (
        <div className="sidebar-container">
            <div className="sidebarmenu">
                <div className="sidebar-header">
                    <img src='/Syn_logo.png' alt="Sync Insights" width={65} />
                    <h5 style={{ fontWeight: "600" }}>Sync Insights</h5>
                </div>
                <div className="sidebar-listcontainer">
                    <ul style={{ position: 'relative' }}>
                        {item.map((item, index) => (
                            <li className='sidebar-list' key={index}>
                                <NavLink
                                    to={item.path}
                                    style={({ isActive }) => ({
                                        textDecoration: 'none',
                                        color: isActive ? '#605bff' : '#9a9a9a',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    })}
                                >
                                    {item.img}
                                    {item.text}
                                </NavLink>
                            </li>
                        ))}
                        <li className='sidebar-list-bottom'>
                            <img src="/user.jpg" alt="user" width={45} height={45} style={{ borderRadius: '10px' }} />
                            <p style={{ fontSize: '12px' }}>Dhruvin Malani <br />Employee</p>
                            <IoLogOut style={{ fontSize: '25px' }} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SidebarCEO;
