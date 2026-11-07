import React from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  selectedDateText: string;
}

export const Header: React.FC<HeaderProps> = ({
  isDarkMode,
  onToggleTheme,
  selectedDateText
}) => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <a href="#" className="brand-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary-accent)' }}>
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/>
          </svg>
          BOOK<span>IT</span>
        </a>
        <div className="badge-pill">Film ▾</div>
        <div className="badge-pill">📅 {selectedDateText}</div>
        <div className="badge-pill">⏰ 8:25 PM</div>
      </div>

      <div className="topbar-right">
        <button 
          className="theme-toggle-btn" 
          onClick={onToggleTheme} 
          title="Toggle Cinema Theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <div className="user-profile">
          <div className="user-avatar">AK</div>
          <div className="user-name">Akanksha T. ▾</div>
        </div>
      </div>
    </header>
  );
};
