import React from 'react';

interface ScreenshotsViewProps {
  tests: any[];
}

const ScreenshotsView: React.FC<ScreenshotsViewProps> = ({ tests }) => {
  const failedTests = tests.filter((t) => t.status === 'failed');

  return (
    <div className="card">
      <h2>Failed Test Screenshots</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {failedTests.map((test, i) => (
          <div key={i} className="card" style={{ padding: '10px' }}>
            {test.screenshot ? (
              <img 
                src={test.screenshot} 
                alt={`Screenshot for ${test.name}`} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
              />
            ) : (
              <div style={{ height: '150px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Screenshot Placeholder for {test.name}
              </div>
            )}
            <p style={{ fontSize: '0.8rem', marginTop: '10px' }}>{test.name}</p>
          </div>
        ))}
        {failedTests.length === 0 && <p>No failures found.</p>}
      </div>
    </div>
  );
};

export default ScreenshotsView;
