import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import '../../style/Manager/Calendar.css';
import Sidebar from './Sidebar';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [task, setTask] = useState(false);

    const handleTask = (index) => {
        setTask(task==index?null:index);
    }

    const renderHeader = () => {
        const monthName = currentDate.toLocaleString('default', { month: 'long' });
        const year = currentDate.getFullYear();

        return (
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>◀</button>
                <div style={{ color: '#4f4e6a', fontSize: '18px' }}>{`${monthName} ${year}`}</div>
                <button onClick={() => changeMonth(1)}>▶</button>
            </div>
        );
    };

    const renderDays = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return (
            <div className="calendar-days">
                {daysOfWeek.map((day) => (
                    <div key={day} className="calendar-day">{day}</div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const daysInMonth = endOfMonth.getDate();

        const prevMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const prevMonthDays = prevMonthEnd.getDate();

        const startDayOfWeek = startOfMonth.getDay();
        const daysArray = [];

        for (let i = startDayOfWeek; i > 0; i--) {
            daysArray.push(
                <div key={`prev-${i}`} className="calendar-cell prev-month">
                    <span>{prevMonthDays - i + 1}</span>
                </div>
            );
        }

        // Fill in the actual days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push(
                <div key={day} onClick={() => handleTask(day)} className="calendar-cell">
                    <span>{day}</span>
                </div>
            );
        }

        // Fill in the remaining cells with the next month's dates
        const totalCells = daysArray.length;
        const remainingCells = 35 - totalCells;

        for (let i = 1; i <= remainingCells; i++) {
            daysArray.push(
                <div key={`next-${i}`} className="calendar-cell next-month">
                    <span>{i}</span>
                </div>
            );
        }


        return <div className="calendar-cells">{daysArray}</div>;
    };



    const changeMonth = (monthChange) => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + monthChange)));
    };

    return (<div style={{ display: 'flex', background: '#f7f7f8', position: 'relative' }}>
        <Sidebar></Sidebar>
        <h4 className='calendar-h4'>Calendar</h4>
        {task && (<div className='create-event'>
            <div className="event-header">
                <p style={{ fontSize: '20px', fontWeight: '500' }}>Create an Event</p>
                <IoMdClose onClick={() => handleTask()} style={{ fontSize: '35px', borderRadius: '15px', padding: '4px 0', marginTop: '-12px', cursor: 'pointer', color: '#ee5d6f', backgroundColor: 'fef3f6' }} />
            </div>
            <input type="text" style={{ width: '100%', border: 'none', backgroundColor: '#f7f7f8', height: '36px', outline: 'none', padding: '0 10px', borderRadius: '10px' }} placeholder='Task Title' />
            <textarea rows={5} style={{ width: '100%', border: 'none', backgroundColor: '#f7f7f8', padding: '0 6px', borderRadius: '10px', outline: 'none', marginTop: '20px' }} ></textarea>
            <div style={{ display: 'flex', width: '100%', marginTop: '20px', border: '0px solid black', height: '35px', gap: '10px' }}>
                <input style={{ width: '50%', border: 'none', backgroundColor: '#f7f7f8', padding: '0 6px', borderRadius: '10px', outline: 'none' }} type="date" />
                <input style={{ width: '50%', border: 'none', backgroundColor: '#f7f7f8', padding: '0 6px', borderRadius: '10px', outline: 'none' }} type="time" />
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px', padding: '12px 0' }}>
                <button style={{ border: 'none', backgroundColor: '#605bff', color: '#ffffff', padding: '8px 11px', borderRadius: '10px' }}>Save</button>
            </div>
        </div>)}

        <div className="calendar">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>

    </div>
    );
};

export default Calendar;
