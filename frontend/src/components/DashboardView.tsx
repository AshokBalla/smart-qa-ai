import React from 'react';
import StatsCard from './StatsCard';

interface DashboardViewProps {
  stats: {
    total: number;
    passed: number;
    failed: number;
    percentage: string;
  };
}

const DashboardView: React.FC<DashboardViewProps> = ({ stats }) => {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        <StatsCard label="Total Tests" value={stats.total} />
        <StatsCard label="Passed" value={stats.passed} color="var(--success)" />
        <StatsCard label="Failed" value={stats.failed} color="var(--danger)" />
        <StatsCard label="Pass Rate" value={stats.percentage} />
      </div>
    </div>
  );
};

export default DashboardView;
