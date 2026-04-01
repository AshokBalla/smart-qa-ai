import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ReportsView from './components/ReportsView';
import APIView from './components/APIView';
import ScreenshotsView from './components/ScreenshotsView';
import AIChatView from './components/AIChatView';

function App() {
  const [reportData, setReportData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetch('/data/test-results.json')
      .then(res => res.json())
      .then(data => {
        // Transform Playwright JSON to our display format
        // Playwright JSON reporter structure can vary, but usually:
        // data.suites contains suites, which contains specs
        
        const allSpecs: any[] = [];
        const processSuite = (suite: any) => {
          if (suite.specs) {
            allSpecs.push(...suite.specs);
          }
          if (suite.suites) {
            suite.suites.forEach(processSuite);
          }
        };
        data.suites.forEach(processSuite);

        const stats = {
          total: allSpecs.length,
          passed: allSpecs.filter((s: any) => s.ok).length,
          failed: allSpecs.filter((s: any) => !s.ok).length,
          percentage: ""
        };
        stats.percentage = stats.total > 0 ? Math.round((stats.passed / stats.total) * 100) + "%" : "0%";

        const tests = allSpecs.map((spec: any) => {
          const result = spec.tests[0]?.results[0];
          
          // Look for screenshots in attachments
          const screenshotAttachment = result?.attachments?.find((a: any) => a.name === 'screenshot');
          const screenshotPath = screenshotAttachment ? `/data/screenshots/${screenshotAttachment.path.split('/').pop()}` : null;

          return {
            name: spec.title,
            status: spec.ok ? 'passed' : 'failed',
            duration: result ? (result.duration / 1000).toFixed(1) + "s" : "0s",
            time: result ? new Date(result.startTime).toLocaleString() : 'N/A',
            screenshot: screenshotPath
          };
        });

        setReportData({ stats, tests, raw: data });
      })
      .catch(err => {
        console.error("Error loading report:", err);
        // Fallback for demo if no file exists
        setReportData({ 
          stats: { total: 0, passed: 0, failed: 0, percentage: "0%" }, 
          tests: [] 
        });
      });
  }, []);

  const renderContent = () => {
    if (!reportData) return <div className="card">Loading test reports...</div>;

    switch (activeTab) {
      case 'dashboard':
        return <DashboardView stats={reportData.stats} />;
      case 'reports':
        return <ReportsView tests={reportData.tests} />;
      case 'api':
        return <APIView tests={reportData.tests} />;
      case 'screenshots':
        return <ScreenshotsView tests={reportData.tests} />;
      case 'ai':
        return <AIChatView reportData={reportData} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: 0 }}>Testing AI Dashboard</h2>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Activity color="var(--primary)" />
            <span>Last Run: {reportData?.tests[0]?.time || 'Pending'}</span>
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
