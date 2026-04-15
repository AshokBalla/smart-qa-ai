import React from 'react';

interface APIViewProps {
  tests: any[];
}

const APIView: React.FC<APIViewProps> = ({ tests }) => {
  const apiTests = tests.filter((t) => t.name.toLowerCase().includes('api'));

  return (
    <div className="card">
      <h2>API Test Results</h2>
      <p>Filtering API tests from main report...</p>
      <table>
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Status</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {apiTests.map((test, i) => (
            <tr key={i}>
              <td>{test.name}</td>
              <td className={`status-${test.status}`}>{test.status.toUpperCase()}</td>
              <td>{test.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default APIView;
