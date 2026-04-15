import React from 'react';

interface ReportsViewProps {
  tests: any[];
}

const ReportsView: React.FC<ReportsViewProps> = ({ tests }) => {
  return (
    <div className="card">
      <h2>Test Execution Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Execution Time</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test, i) => (
            <tr key={i}>
              <td>{test.name}</td>
              <td className={`status-${test.status}`}>{test.status.toUpperCase()}</td>
              <td>{test.duration}</td>
              <td>{test.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsView;
