import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { IoIosArrowRoundBack } from "react-icons/io";
import '../../style/Employee/Task.css';

const Task = () => {
    const [showAll, setShowAll] = useState(false);
    const [visible, setVisible] = useState(false);

    const taskData = [
        {
            taskName: 'Invoices',
            startDate: '03/12/2021',
            endDate: '05/12/2021',
            members: '5 Member',
            status: 'Pending'
        },
        {
            taskName: 'Product Numbering',
            startDate: '03/12/2021',
            endDate: '05/12/2021',
            members: '5 Member',
            status: 'Pending'
        },
        {
            taskName: 'Shipment Processing',
            startDate: '04/01/2021',
            endDate: '06/01/2021',
            members: '6 Member',
            status: 'Pending'
        },
        {
            taskName: 'Product Packaging',
            startDate: '04/10/2021',
            endDate: '06/10/2021',
            members: '4 Member',
            status: 'Pending'
        },
        {
            taskName: 'Customer Support',
            startDate: '05/15/2021',
            endDate: '07/15/2021',
            members: '3 Member',
            status: 'Pending'
        },
        {
            taskName: 'Quality Check',
            startDate: '06/05/2021',
            endDate: '08/05/2021',
            members: '4 Member',
            status: 'Pending'
        },
        {
            taskName: 'Inventory Management',
            startDate: '07/01/2021',
            endDate: '09/01/2021',
            members: '5 Member',
            status: 'Pending'
        }
    ];

    const completedData = [
        {
            taskName: 'Invoices',
            startDate: '03/12/2021',
            endDate: '05/12/2021',
            members: '5 Member',
            status: 'Completed'
        },
        {
            taskName: 'Product Numbering',
            startDate: '03/12/2021',
            endDate: '05/12/2021',
            members: '5 Member',
            status: 'Completed'
        },
        {
            taskName: 'Shipment Processing',
            startDate: '04/01/2021',
            endDate: '06/01/2021',
            members: '6 Member',
            status: 'Completed'
        },
        {
            taskName: 'Product Packaging',
            startDate: '04/10/2021',
            endDate: '06/10/2021',
            members: '4 Member',
            status: 'Completed'
        },
        {
            taskName: 'Customer Support',
            startDate: '05/15/2021',
            endDate: '07/15/2021',
            members: '3 Member',
            status: 'Completed'
        },
        {
            taskName: 'Quality Check',
            startDate: '06/05/2021',
            endDate: '08/05/2021',
            members: '4 Member',
            status: 'Completed'
        },
        {
            taskName: 'Inventory Management',
            startDate: '07/01/2021',
            endDate: '09/01/2021',
            members: '5 Member',
            status: 'Completed'
        }
    ];

    const visibleData = taskData.slice(0, 2);

    return (
        <div className='task-container'>
            <Sidebar />
            {visible ? <div className="manager-content-container">
                <div onClick={() => setVisible(false)} className="product-item-header">
                    <IoIosArrowRoundBack style={{ fontSize: '28px' }} />
                    <p style={{ fontSize: "18px" }}>Back</p>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th >Check Box</th>
                                <th >Task Name</th>
                                <th >Start Date</th>
                                <th >End Date</th>
                                <th >Member</th>
                                <th >Status</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedData.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                        <div className="table-cell">
                                            <input type="checkbox" />
                                        </div>
                                    </td>
                                    <td style={{ color: '#605aff' }}>{item.taskName}</td>
                                    <td style={{ color: '#5a5973' }}>{item.startDate}</td>
                                    <td style={{ color: '#df5f6a' }}>{item.endDate}</td>
                                    <td style={{ color: '#5a5973' }}>{item.members}</td>
                                    <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#3a974c', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
                                    <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                        <button className="action-button edit">Edit</button>
                                        <button className="action-button delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> :
                showAll ? <div className="manager-content-container">
                    <div onClick={() => setShowAll(false)} className="product-item-header">
                        <IoIosArrowRoundBack style={{ fontSize: '28px' }} />
                        <p style={{ fontSize: "18px" }}>Back</p>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th >Check Box</th>
                                    <th >Task Name</th>
                                    <th >Start Date</th>
                                    <th >End Date</th>
                                    <th >Member</th>
                                    <th >Status</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskData.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                            <div className="table-cell">
                                                <input type="checkbox" />
                                            </div>
                                        </td>
                                        {/* Adjusted columns */}
                                        <td style={{ color: '#605aff' }}>{item.taskName}</td>
                                        <td style={{ color: '#5a5973' }}>{item.startDate}</td>
                                        <td style={{ color: '#df5f6a' }}>{item.endDate}</td>
                                        <td style={{ color: '#5a5973' }}>{item.members}</td>
                                        <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#ff8f6b', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
                                        <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                            <button className="action-button edit">Edit</button>
                                            <button className="action-button delete">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> : <div className="task-content-container">
                    <h4>Task Preview</h4>
                    <div style={{ border: '0px solid black', backgroundColor: '#ffffff', height: '260px', overflow: 'hidden', marginTop: '20px', borderRadius: '12px' }} className="manager-content-container">
                        <div className="manager-header-content">
                            <p style={{ fontSize: '18px', fontWeight: '500' }}>To Do</p>
                            <p style={{ cursor: 'pointer', color: '#6a65ff', fontSize: '17px', fontWeight: '500' }} onClick={() => setShowAll(true)}>
                                See more
                            </p>
                        </div>
                        <div style={{ marginTop: '-8px' }} className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#ffffff' }}>Check Box</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Task Name</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Start Date</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>End Date</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Member</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Status</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                                <div className="table-cell">
                                                    <input type="checkbox" />
                                                </div>
                                            </td>
                                            {/* Adjusted columns */}
                                            <td style={{ color: '#605aff' }}>{item.taskName}</td>
                                            <td style={{ color: '#5a5973' }}>{item.startDate}</td>
                                            <td style={{ color: '#df5f6a' }}>{item.endDate}</td>
                                            <td style={{ color: '#5a5973' }}>{item.members}</td>
                                            <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#ff8f6b', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
                                            <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                                <button className="action-button edit">Edit</button>
                                                <button className="action-button delete">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ border: '0px solid black', backgroundColor: '#ffffff', height: '260px', overflow: 'hidden', marginTop: '20px', borderRadius: '12px' }} className="manager-content-container">
                        <div className="manager-header-content">
                            <p style={{ fontSize: '18px', fontWeight: '500' }}>Done</p>
                            <p style={{ cursor: 'pointer', color: '#6a65ff', fontSize: '17px', fontWeight: '500' }} onClick={() => setVisible(true)}>
                                See more
                            </p>
                        </div>
                        <div style={{ marginTop: '-8px' }} className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ backgroundColor: '#ffffff' }}>Check Box</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Task Name</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Start Date</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>End Date</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Member</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Status</th>
                                        <th style={{ backgroundColor: '#ffffff' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completedData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                                <div className="table-cell">
                                                    <input checked='true' type="checkbox" />
                                                </div>
                                            </td>
                                            {/* Adjusted columns */}
                                            <td style={{ color: '#605aff' }}>{item.taskName}</td>
                                            <td style={{ color: '#5a5973' }}>{item.startDate}</td>
                                            <td style={{ color: '#df5f6a' }}>{item.endDate}</td>
                                            <td style={{ color: '#5a5973' }}>{item.members}</td>
                                            <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#3a974c', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
                                            <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                                <button className="action-button edit">Edit</button>
                                                <button className="action-button delete">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default Task;
