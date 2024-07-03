import React from 'react';

const Table = ({ requests }) => {
  return (
    <div className="table-container">
      <h1 className="user-name">Requests</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Req. ID</th>
            <th>Req. Status</th>
            <th>Req. Type</th>
            <th>Req. Time</th>
            <th>Content Type</th>
            <th>IP Address</th>
            <th>OS</th>
            <th>User Agent</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.request_id}</td>
              <td>{200}</td>
              <td>{row.request_type}</td>
              <td>{row.request_time}</td>
              <td>{row.content_type || 'N/A'}</td>
              <td>{row.ip_address || 'N/A'}</td>
              <td>{row.os || 'Window'}</td>
              <td>{row.user_agent || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
