import React, { useEffect, useState, useRef } from 'react';
import { IoAddOutline } from "react-icons/io5";
import SidebarCEO from './SidebarCEO';
import { CiSearch } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import '../../style/CEO/Invoice.css';

const Invoice = () => {
    const [val, setVal] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectAll, setSelectAll] = useState(false); 
    const [selectedRows, setSelectedRows] = useState([]);
    const input = useRef();

    const data = [
        { invoiceId: "#876364", name: "Arrona Gaur", email: "arronagaur@gmail.com", date: "12 Dec, 2020", status: "Complete" },
        { invoiceId: "#876123", name: "James Mullican", email: "jamesmullican@gmail.com", date: "10 Dec, 2020", status: "Pending" },
        { invoiceId: "#876213", name: "Robert Bucins", email: "robertbucins@gmail.com", date: "09 Dec, 2020", status: "Complete" },
        { invoiceId: "#876987", name: "Bethany Jackson", email: "bethanyjackson@gmail.com", date: "09 Dec, 2020", status: "Cancel" },
        { invoiceId: "#876145", name: "Anne Jacob", email: "annejacob@gmail.com", date: "08 Dec, 2020", status: "Complete" },
        { invoiceId: "#876345", name: "Jhon Deo", email: "jhondeo@gmail.com", date: "08 Dec, 2020", status: "Complete" },
        { invoiceId: "#876544", name: "Bethany Jackson", email: "bethanyjackson@gmail.com", date: "02 Dec, 2020", status: "Cancel" },
        { invoiceId: "#876789", name: "James Mullican", email: "jamesmullican@gmail.com", date: "01 Dec, 2020", status: "Pending" }
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Complete':
                return { backgroundColor: '#C6F6D5', color: '#2F855A' };
            case 'Pending':
                return { backgroundColor: '#FEF3C7', color: '#D69E2E' };
            case 'Cancel':
                return { backgroundColor: '#FED7D7', color: '#C53030' };
            default:
                return {};
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredData = data.filter((item) => item.name.toLowerCase().includes(searchTerm));
                setVal(filteredData);
                setSelectedRows(new Array(filteredData.length).fill(false));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [searchTerm]);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setSelectedRows(new Array(val.length).fill(newSelectAll));
    };

    const handleCheckboxChange = (index) => {
        const updatedRows = [...selectedRows];
        updatedRows[index] = !updatedRows[index];
        setSelectedRows(updatedRows);

        const allSelected = updatedRows.every(Boolean);
        setSelectAll(allSelected);
    };

    return (
        <div className="invoice-container">
            <SidebarCEO />
            <div className="manager-content-container">
                <div className="manager-header-content">
                    <h4>Invoice List</h4>
                    <div style={{ display: 'flex' }}>
                        <input 
                            style={{ border: 'none', padding: '0px 10px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', outline: 'none' }} 
                            type="text" 
                            name="search" 
                            placeholder='Search' 
                            ref={input} 
                            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
                        />
                        <CiSearch style={{ border: '0px solid black', height: '100%', fontSize: '24px', backgroundColor: '#ffffff', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', paddingRight: '6px' }} />
                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', border: 'none', color: 'white', backgroundColor: '#605BFF', borderRadius: '10px', marginLeft: '10px' }}>
                            <IoAddOutline style={{ color: 'white' }} />Add New
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th>Invoice Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {val.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px', }}>
                                        <input 
                                            type="checkbox" 
                                            checked={selectedRows[index]} 
                                            onChange={() => handleCheckboxChange(index)} 
                                        />
                                    </td>
                                    <td>{item.invoiceId}</td>
                                    <td>
                                        <div className="table-cell">
                                            <img
                                                className="avatar"
                                                src={`https://ui-avatars.com/api/?name=${item.name}`}
                                                alt="Avatar"
                                            />
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td><MdEmail style={{ color: '#3a974c', fontSize: '20px', marginRight: '8px' }} />{item.email}</td>
                                    <td><FaCalendarAlt style={{ color: '#4285f4', fontSize: '20px', marginRight: '8px' }} />{item.date}</td>
                                    <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px', paddingTop: '20px' }}>
                                        <span style={{ ...getStatusStyle(item.status), borderRadius: '20px', padding: '6px' }}>{item.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
