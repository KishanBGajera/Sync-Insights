import React, { useState } from 'react'
import Sidebar from './SidebarCEO'
import { FaAward } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../../style/CEO/Analytics.css'

const Analytics = () => {
  const [button, setButton] = useState('product');
  const [makeVisible, setMakeVisible] = useState(null);
  const [employee, setEmployee] = useState(false);
  const [item, setItem] = useState(false);

  const data = [
    { name: "Bluetooth Devices", price: "$10", totalOrder: "34,666 Piece", totalSales: "$3,46,660" },
    { name: "Airdot", price: "$15", totalOrder: "20,000 Piece", totalSales: "$3,00,000" },
    { name: "Shoes", price: "$10", totalOrder: "15,000 Piece", totalSales: "$1,50,000" },
    { name: "Kids T-Shirt", price: "$12", totalOrder: "10,000 Piece", totalSales: "$1,20,000" },
    { name: "Smart Watch", price: "$12", totalOrder: "10,000 Piece", totalSales: "$1,20,000" },
    { name: "Girls Top", price: "$12", totalOrder: "10,000 Piece", totalSales: "$1,20,000" }
  ];

  const Companydata = [
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
      name: 'John Deo',
      email: 'johndoe2211@gmail.com',
      phone: '+33757005467',
      gender: 'Male',
    },
    {
      name: 'Shelby Goode',
      email: 'shelbygoode481@gmail.com',
      phone: '+33757005467',
      gender: 'Female',
    },
    {
      name: 'John Deo',
      email: 'johndoe2211@gmail.com',
      phone: '+33757005467',
      gender: 'Male',
    },
    {
      name: 'Shelby Goode',
      email: 'shelbygoode481@gmail.com',
      phone: '+33757005467',
      gender: 'Female',
    },
    {
      name: 'John Deo',
      email: 'johndoe2211@gmail.com',
      phone: '+33757005467',
      gender: 'Male',
    },
    {
      name: 'Shelby Goode',
      email: 'shelbygoode481@gmail.com',
      phone: '+33757005467',
      gender: 'Female',
    },
    {
      name: 'John Deo',
      email: 'johndoe2211@gmail.com',
      phone: '+33757005467',
      gender: 'Male',
    },
    {
      name: 'Shelby Goode',
      email: 'shelbygoode481@gmail.com',
      phone: '+33757005467',
      gender: 'Female',
    },
    {
      name: 'John Deo',
      email: 'johndoe2211@gmail.com',
      phone: '+33757005467',
      gender: 'Male',
    },
    {
      name: 'Shelby Goode',
      email: 'shelbygoode481@gmail.com',
      phone: '+33757005467',
      gender: 'Female',
    },
    {
      name: 'John Deo',
      email: 'johndoe2211@gmail.com',
      phone: '+33757005467',
      gender: 'Male',
    },
    {
      name: 'Shelby Goode',
      email: 'shelbygoode481@gmail.com',
      phone: '+33757005467',
      gender: 'Female',
    },
  ];

  const data1 = [
    { month: 'Jan', productAdd: 23400 },
    { month: 'Feb', productAdd: 15000 },
    { month: 'Mar', productAdd: 30000 },
    { month: 'Apr', productAdd: 22000 },
    { month: 'May', productAdd: 10000 },
    { month: 'Jun', productAdd: 23400 },
    { month: 'Jul', productAdd: 5000 },
  ];

  const sortedData = data.sort((a, b) => {
    const salesA = parseInt(a.totalSales.replace(/[$,]/g, ''));
    const salesB = parseInt(b.totalSales.replace(/[$,]/g, ''));

    return salesB - salesA;
  });

  const handleVisibility = (index) => {
    setMakeVisible(index === makeVisible ? null : index);
  }

  const handleEmployee = () => {
    setEmployee(!employee);
    if (makeVisible != null) {
      setMakeVisible(null);
    }
  }

  const handleButton = (name) => {
    setButton(name);
    if (makeVisible != null) {
      setMakeVisible(null);
    }
  }

  const visibleData = data.slice(0, 5);
  return (
    <div className='analytics-content-container'>
      <Sidebar />
      {item ? <div className="manager-content-container">
        <div onClick={() => setItem(false)} className="product-item-header">
          <IoIosArrowRoundBack style={{ fontSize: '28px' }} />
          <p style={{ fontSize: "18px" }}>Back</p>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Price</th>
                <th>Total Order</th>
                <th>Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>{index + 1 <= 3 ? <FaAward style={{ color: '#ff7a00', fontSize: '22px', marginLeft: '-5px' }} /> : index + 1}</td>
                  <td style={{ color: '#2f84e3' }}><img src={item.imageUrl} /> {item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.totalOrder}</td>
                  <td style={{ color: '#45a55a', borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>{item.totalSales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> : employee ? <div className='employee-container'>
        <div onClick={handleEmployee} className="employee-container-header">
          <IoIosArrowRoundBack style={{ fontSize: '28px' }} />
          <p style={{ fontSize: "18px" }}>Back</p>
        </div>
        <div className="employee-insert">
          <div className="employee-form">
            <h3>New Employee </h3>
            <p style={{ color: '#9a9a9a' }}>Enter the details for a new Company.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>Name</span>
                <input style={{ marginTop: '6px', width: '240px' }} required name='name' type="text" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>Email</span>
                <input style={{ marginTop: '6px', width: '240px' }} name='email' required type="email" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>phone</span>
                <input style={{ marginTop: '6px', width: '240px' }} name='phone' required type="text" maxLength={10} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>Gender</span>
                <select style={{ marginTop: '6px', width: '240px', border: 'none', backgroundColor: '#f7f7f8', borderRadius: '5px', padding: '3.5px 5px' }} required name='gender'>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>Job Title</span>
                <input style={{ marginTop: '6px', width: '240px' }} required name='job' type="text" maxLength={10} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>Start Date</span>
                <input style={{ marginTop: '6px', width: '240px' }} name='phone' required type="text" maxLength={10} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>Department</span>
                <select style={{ marginTop: '6px', width: '240px', border: 'none', borderRadius: '5px', backgroundColor: '#f7f7f8', padding: '3.5px 5px' }} required name='gender'>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginTop: '6px' }} className="form-details">
                <span>Salary</span>
                <input style={{ marginTop: '6px', width: '240px' }} required name='phone' type="text" maxLength={10} />
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <button type='submit'>Add Company</button>
              </div>
            </div>

          </div>
        </div>
      </div> :
        <div style={{ width: '100%', padding: '30px 30px', height: '100vh' }}>
          {button == 'product' ? <div className="analytics-container">
            <h4>Product Analytics</h4>
            <div className="date-container">
              {/* <input type="date" name="to" id="" />
              <input type="date" name="from" id="" /> */}
            </div>
          </div> : <div className="manager-header-content">
            <h4>Company List</h4>
            <button onClick={handleEmployee} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', border: 'none', color: 'white', backgroundColor: '#605BFF', borderRadius: '10px' }}><IoAddOutline style={{ color: 'white' }} />Add Company</button>
          </div>}
          <div className="analytics-header">
            <p onClick={() => handleButton('product')} style={{ backgroundColor: button == 'product' ? '#605bff' : "", color: button == 'product' ? 'white' : "", borderRadius: '10px' }}>Product</p>
            <p onClick={() => handleButton('customer')} style={{ backgroundColor: button == 'customer' ? '#605bff' : "", color: button == 'customer' ? 'white' : "", borderRadius: '10px' }} >Customer</p>
          </div>
          {button == 'product' ? <div className='analytics-data-container'>
            <div style={{ backgroundColor: '#ffffff', height: '100%', overflow: 'scroll', borderRadius: '10px' }} className="manager-content-container">
              <div className="manager-header-content">
                <p style={{ fontSize: '20px', fontWeight: 500 }}>Top Selling Product</p>
                <p style={{ cursor: 'pointer', color: '#605bff' }} onClick={() => setItem(true)}>
                  See more
                </p>
              </div>
              <div className="table-container">
                <table style={{ borderSpacing: '0px 2px' }} className="table">
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: '#ffffff' }}>SN</th>
                      <th style={{ backgroundColor: '#ffffff' }}>Name</th>
                      <th style={{ backgroundColor: '#ffffff' }}>Price</th>
                      <th style={{ backgroundColor: '#ffffff' }}>Total Order</th>
                      <th style={{ backgroundColor: '#ffffff' }}>Total Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleData.map((item, index) => (
                      <tr key={index}>
                        <td style={{ backgroundColor: (index + 1) % 2 != 0 ? '#f7f7f8' : '#ffffff' }}>{index + 1 <= 3 ? <FaAward style={{ color: '#ff7a00', fontSize: '22px', marginLeft: '-5px' }} /> : index + 1}</td>
                        <td style={{ color: '#2f84e3', backgroundColor: (index + 1) % 2 != 0 ? '#f7f7f8' : '#ffffff' }}><img src={item.imageUrl} /> {item.name}</td>
                        <td style={{ backgroundColor: (index + 1) % 2 != 0 ? '#f7f7f8' : '#ffffff' }}>{item.price}</td>
                        <td style={{ backgroundColor: (index + 1) % 2 != 0 ? '#f7f7f8' : '#ffffff' }}>{item.totalOrder}</td>
                        <td style={{ color: '#45a55a', backgroundColor: (index + 1) % 2 != 0 ? '#f7f7f8' : '#ffffff' }}>{item.totalSales}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ width: '50%', height: 300, padding: '10px', backgroundColor: '#ffffff', borderRadius: '10px', marginTop: '20px', }}>
              <h5>Product Add by Month</h5>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data1}
                  layout="vertical"
                  margin={{
                    top: 20, right: 20, left: -14, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="month" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="productAdd" fill="#ff8f6b" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div> : <div style={{ height: '85%', padding: '0px', marginTop: '20px', }} className="manager-content-container">
            <div className="table-container">
              <table style={{ marginTop: '-20px' }} className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone number</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {Companydata.map((item, index) => (
                    <tr onClick={() => handleVisibility(index)} key={index}>
                      <td style={{ borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                        <div className="table-cell">
                          <img
                            className="avatar"
                            src={`https://ui-avatars.com/api/?name=${item.name}`}
                            alt="Avatar"
                          />
                          <span>{item.name}</span>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}>
                        <span className={`gender ${item.gender.toLowerCase()}`}>
                          {item.gender}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
        </div>}
      {Companydata.map((item, index) => (
        makeVisible === index && (
          <div key={index} style={{ backgroundColor: '#ffffff' }} className="employee-info">
            <div className="employee-info-header">
              <img style={{ borderRadius: '20px' }} src={`https://ui-avatars.com/api/?name=${item.name}`} alt={item.name} />
              <h5 style={{ marginTop: '5px' }}>{item.name}</h5>
              <p style={{ marginTop: '-8px', fontSize: '12px' }}>{item.type}</p>
            </div>
            <div className="employee-info-contact">
              <h5>Contact Info</h5>
              <div className="contact-info">
                <MdEmail style={{ fontSize: '25px', color: 'b4b4bf' }} />
                <p>{item.email}</p>
              </div>
              <div className="contact-info">
                <FaPhoneAlt style={{ fontSize: '20px', color: 'b4b4bf' }} />
                <p>{item.phone}</p>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default Analytics;