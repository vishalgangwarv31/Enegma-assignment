import React from 'react'
import { useState , useEffect } from 'react'
import './App.css'
import Menu from '../src/Component/Menu'
import Navbar from './Component/Navbar'
import Information from './Component/Information'
import BarChar from './Component/BarChart'
import PieChar from './Component/PieCha'
import Table from './Component/Table'

function App() {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/requests');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setRequests(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  // console.log(requests)
  if (requests === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className='app-container'>
      <Menu/>
      <div className='info-container'>
        <Navbar />
        <Information requests={requests}/>
        <div className='charts-info'>
          <BarChar requests={requests}/>
          <PieChar requests={requests}/>
        </div>
        <Table requests={requests}/>
      </div>
    </div>
  )
}

export default App
