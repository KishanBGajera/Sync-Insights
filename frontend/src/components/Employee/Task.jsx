import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../../style/Employee/Task.css';

const Task = () => {
    const [showAll, setShowAll] = useState(false);

    const data = [
        {
            name: 'John Deo',
            email: 'johndoe2211@gmail.com',
            phone: '+33757005467',
            gender: 'Male',
            type: 'UI/UX Designer'
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        {
            name: 'Shelby Goode',
            email: 'shelbygoode481@gmail.com',
            phone: '+33757005467',
            gender: 'Female',
        },
        // ... other records
    ];

    const visibleData = showAll ? data : data.slice(0, 2);

    return (
        <div className='task-container'>
            <Sidebar />
            <div className="task-content-container">
                <h4>Task Preview</h4>
                <div style={{ border: '1px solid black', backgroundColor: '#ffffff', height: '400px', overflow: 'scroll' }} className="manager-content-container">
                    <div className="manager-header-content">
                        <p>To Do</p>
                        <p style={{ cursor: 'pointer' }} onClick={() => setShowAll(!showAll)}>
                            {showAll ? 'Show less' : 'See more'}
                        </p>
                    </div>
                    <div className="table-container">
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
                                        <td>{item.phone}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Task;
