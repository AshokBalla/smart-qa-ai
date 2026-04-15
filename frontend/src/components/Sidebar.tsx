import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Globe, 
  MessageSquare 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'reports', label: 'Test Reports', icon: FileText },
    { id: 'screenshots', label: 'Screenshots', icon: Image },
    { id: 'api', label: 'API Results', icon: Globe },
    { id: 'ai', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="sidebar">
      <h1>Testing AI</h1>
      <ul className="nav-menu">
        {menuItems.map((item) => (
          <li 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`} 
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={20} /> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
