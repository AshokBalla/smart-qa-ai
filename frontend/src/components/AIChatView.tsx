import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

interface AIChatViewProps {
  reportData: any;
}

const AIChatView: React.FC<AIChatViewProps> = ({ reportData }) => {
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hello! I am your QA Assistant. How can I help you with the test reports today?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text?: string) => {
    const messageText = text || userInput;
    if (!messageText.trim() || isLoading) return;

    const newMessages = [...chatMessages, { role: 'user' as const, text: messageText }];
    setChatMessages(newMessages);
    setUserInput('');
    setIsLoading(true);

    const response = await geminiService.sendMessage(messageText, reportData || { error: "No report data loaded" });
    setChatMessages([...newMessages, { role: 'ai', text: response }]);
    setIsLoading(false);
  };

  const quickActions = [
    { label: 'Summarize Failures', prompt: 'Summarize all failed tests and suggest fixes.' },
    { label: 'Test Stats', prompt: 'Give me a breakdown of pass/fail statistics.' },
    { label: 'API Health', prompt: 'How did the API tests perform?' },
  ];

  return (
    <div className="card chat-container">
      <h2>AI QA Assistant</h2>
      
      <div className="quick-actions" style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
        {quickActions.map((action, i) => (
          <button 
            key={i} 
            className="action-btn"
            onClick={() => handleSendMessage(action.prompt)}
            disabled={isLoading}
            style={{ 
              padding: '5px 12px', 
              fontSize: '0.8rem', 
              borderRadius: '20px', 
              border: '1px solid var(--primary)',
              background: 'transparent',
              color: 'var(--primary)',
              cursor: 'pointer'
            }}
          >
            {action.label}
          </button>
        ))}
      </div>

      <div className="chat-messages">
        {chatMessages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message ai">Thinking...</div>}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask about test results..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isLoading}
        />
        <button onClick={() => handleSendMessage()} disabled={isLoading}>
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIChatView;
