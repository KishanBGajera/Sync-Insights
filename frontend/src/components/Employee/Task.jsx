import React, { useState,useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import { IoIosArrowRoundBack } from "react-icons/io";
import '../../style/Employee/Task.css';
import { GetAllTask, UpdateTask } from '../../Global/apiCall';
import { AuthContext } from '../../store/AuthContext';

const Task = () => {
    const {Details} = useContext(AuthContext);
    const [showAll, setShowAll] = useState(false);
    const [visible, setVisible] = useState(false);
    const [taskData, setTaskData] = useState([]);
    const [completeData, setCompleteData] = useState([]);
    const [status,setStatus]=useState({status:"",task_id:"",user_id:Details?._id})

    const getInfo = (e) => {
        console.log(`${e.target.name}:${e.target.checked}`);
      
        if (e.target.checked == false) {
          setStatus((prevState) => ({
            ...prevState,
            [e.target.name]: "pending",
          }));
        } else {
          setStatus((prevState) => ({
            ...prevState,
            [e.target.name]: "completed",
          }));
        }
      };
      
      const handleUpdate = (id) => {
        setStatus((prevState) => ({
          ...prevState,
          task_id: id,
        }));
      };
      
      // Trigger the API call when `status` is updated
      useEffect(() => {
        if (status.task_id) {
          // Only call UpdateTask when the status is updated and task_id exists
          UpdateTask(status)
            .then((res) => {
              console.log("Task updated successfully:", res);
              setStatus({
                status: "",
                task_id: "",
              })
            })
            .catch((err) => {
              console.error("Error updating task:", err);
            });
        }
      }, [status]); // This will run every time `status` changes
      

      useEffect(() => {
        const fetchData = async () => {
            try {
                if (Details._id) {
                    const userData = await GetAllTask(Details._id);
                    const tasks = userData.data;
                    const doneTasks = tasks.filter(task => task.status === "completed");
                    const pendingTasks = tasks.filter(task => task.status !== "completed");
                    
                    setTaskData(pendingTasks);
                    setCompleteData(doneTasks);
                }
            } catch (error) {
                console.error("Error while retrieving data from users", error);
            }
        };
    
        if (Details) {
            fetchData();
        }
    }, [Details,status]);
       
      
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
                                {/* <th >Check Box</th> */}
                                <th >Task Name</th>
                                <th >Start Date</th>
                                <th >End Date</th>
                                <th >Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completeData.map((item, index) => (
                                <tr key={index}>
                                    {/* <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                        <div className="table-cell">
                                            <input type="checkbox" />
                                        </div>
                                    </td> */}
                                    <td style={{ color: '#605aff' }}>{item.task_name}</td>
                                    <td style={{ color: '#5a5973' }}>{item.createdAt}</td>
                                    <td style={{ color: '#df5f6a' }}>{item.deadline}</td>
                                    <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#3a974c', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
                                    {/* <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                        <button className="action-button edit">Edit</button>
                                        <button className="action-button delete">Delete</button>
                                    </td> */}
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
                                    {/* <th >Check Box</th> */}
                                    <th >Task Name</th>
                                    <th >Start Date</th>
                                    <th >End Date</th>
                                    <th >Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskData.map((item, index) => (
                                    <tr key={index}>
                                        {/* <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                            <div className="table-cell">
                                                <input name='status'   type="checkbox" />
                                            </div>
                                        </td> */}
                                        {/* Adjusted columns */}
                                        <td style={{ color: '#605aff' }}>{item.task_name}</td>
                                        <td style={{ color: '#5a5973' }}>{item.createdAt}</td>
                                        <td style={{ color: '#df5f6a' }}>{item.deadline}</td>
                                        <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#ff8f6b', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
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
                                        <th style={{ backgroundColor: '#ffffff' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {visibleData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                                <div className="table-cell">
                                                    <input onChange={getInfo} name='status' onClick={()=>handleUpdate(item._id)} type="checkbox" />
                                                </div>
                                            </td>
                                            {/* Adjusted columns */}
                                            <td style={{ color: '#605aff' }}>{item.task_name}</td>
                                            <td style={{ color: '#5a5973' }}>{item.createdAt}</td>
                                            <td style={{ color: '#df5f6a' }}>{item.deadline}</td>
                                            <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#ff8f6b', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
                                            {/* <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                                                <button className="action-button edit">Edit</button>
                                                <button className="action-button delete">Delete</button>
                                            </td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style={{ border: '0px solid black', backgroundColor: '#ffffff', height: '250px', overflow: 'hidden', marginTop: '20px', borderRadius: '12px' }} className="manager-content-container">
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
                                        <th style={{ backgroundColor: '#ffffff' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {completeData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                                <div className="table-cell">
                                                    <input checked='true' name='status' onChange={getInfo} onClick={()=>handleUpdate(item._id)} type="checkbox" />
                                                </div>
                                            </td>
                                            {/* Adjusted columns */}
                                            <td style={{ color: '#605aff' }}>{item.task_name}</td>
                                            <td style={{ color: '#5a5973' }}>{item.createdAt}</td>
                                            <td style={{ color: '#df5f6a' }}>{item.deadline}</td>
                                            <td><span style={{ border: '0px solid black', padding: '6px 10px', backgroundColor: '#3a974c', color: '#ffffff', borderRadius: '10px' }}>{item.status}</span></td>
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
