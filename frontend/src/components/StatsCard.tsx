import React from 'react';

interface StatsCardProps {
  label: string;
  value: string | number;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, color }) => {
  return (
    <div className="card stat-card">
      <div className="stat-value" style={{ color }}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatsCard;
