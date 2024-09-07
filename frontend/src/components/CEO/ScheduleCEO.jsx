import React,{useState} from 'react'
import SidebarCEO from './SidebarCEO';
import { IoAddOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { GoClockFill } from "react-icons/go";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";

const ScheduleCEO = () => {
    const [visible, setVisible] = useState(true);
    const data = [{ date: '12/08/2024', time: '10:10 AM', location: 'Surat' },
    { date: '12/08/2024', time: '10:10 AM', location: 'Surat' },
    { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' }, { date: '12/08/2024', time: '10:10 AM', location: 'Surat' },
    ]
    return (
        <div className='schedule-container'>
            <SidebarCEO />
            {visible ? <div className="manager-content-container">
                <div className="manager-header-content">
                    <h4>Schedule List</h4>
                    <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', border: 'none', color: 'white', backgroundColor: '#605BFF', borderRadius: '10px' }} onClick={() => setVisible(false)}><IoAddOutline style={{ color: 'white' }} />Add New</button>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                        <div style={{ gap: '10px' }} className="table-cell">
                                            <FaCalendarAlt style={{ fontSize: '19px', color: '#4285f4' }} />
                                            <span style={{ fontSize: '15px', fontWeight: '400' }}>{item.date}</span>
                                        </div>
                                    </td>
                                    <td><GoClockFill style={{ marginRight: '10px', color: '#68677f', fontSize: '20px' }} />{item.time}</td>
                                    <td>
                                        <div style={{ color: '#605bff', backgroundColor: '#f0efff', borderRadius: '20px', padding: '6px 16px', marginTop: '-5px', width: 'max-content' }}>
                                            <FaLocationDot style={{ marginRight: '10px' }} />
                                            {item.location}
                                        </div>
                                    </td>
                                    <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                        <button className="action-button edit">Edit</button>
                                        <button className="action-button delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div> : <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', display: 'flex', top: '16px', left: '14px', cursor: 'pointer' }} onClick={() => setVisible(true)} >
                    <IoIosArrowRoundBack style={{ fontSize: '28px' }} />
                    <p style={{ fontSize: "18px" }}>Back</p>
                </div>
                <div style={{ marginTop: '0px' }} className='create-event'>
                    <div className="event-header">
                        <p style={{ fontSize: '20px', fontWeight: '500' }}>Create a Schedule</p>
                    </div>
                    <input type="text" style={{ width: '100%', border: 'none', backgroundColor: '#f7f7f8', height: '36px', outline: 'none', padding: '0 10px', borderRadius: '10px' }} placeholder='Schedule Title' />
                    <input type='text' style={{ width: '100%', border: 'none', backgroundColor: '#f7f7f8', padding: '0 10px', height: '36px', borderRadius: '10px', outline: 'none', marginTop: '20px' }} placeholder='Enter Location' />
                    <div style={{ display: 'flex', width: '100%', marginTop: '20px', border: '0px solid black', height: '35px', gap: '10px' }}>
                        <input style={{ width: '50%', border: 'none', backgroundColor: '#f7f7f8', padding: '0 6px', borderRadius: '10px', outline: 'none' }} type="date" />
                        <input style={{ width: '50%', border: 'none', backgroundColor: '#f7f7f8', padding: '0 6px', borderRadius: '10px', outline: 'none' }} type="time" />
                    </div>
                    <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', padding: '12px 0' }}>
                        <button style={{ border: 'none', backgroundColor: '#605bff', color: '#ffffff', padding: '8px 11px', borderRadius: '10px' }}>Save</button>
                    </div>
                </div>
            </div>}

        </div>

    )
}

export default ScheduleCEO;