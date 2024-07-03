import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomBarChart = ({requests}) => {
    const data = transformData(requests);

    const RoundedBar = (props) => {
      const { x, y, width, height } = props;
  
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} rx={5} ry={5} fill={props.fill} />
        </g>
      );
    };
  
    return (
      <div style={{ width: '58%', borderRadius: '20px', overflow: 'hidden' }}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="value" shape={<RoundedBar />}>
              {
                data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.name === 'Get' ? '#6200ea' : '#d0c4fc'} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };


  const transformData = (requests) => {
    const counts = {
      "GET": 0,
      "POST": 0,
      "PUT": 0,
      "DELETE": 0,
      "PATCH": 0
    };

    requests.reduce((acc, req) => {
      acc[req.request_type] += 1;
      return acc;
    }, counts);

    const data = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));

    return data;
  };
  
  


const BarChar = ({requests}) =>{
    return(
        <div className='chart-container'>
        <h2 className='user-name'> Request Type</h2>
        <p className='user-position'>Number of requests based on type</p>
        <CustomBarChart  requests={requests}/>
    </div>
    )
}

export default BarChar;
