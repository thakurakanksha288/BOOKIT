import React, { useState } from 'react';
import { ContentItem, Seat } from '../types';

interface AgenticAssistantProps {
  catalog: ContentItem[];
  onSelectMovie: (movie: ContentItem) => void;
  onSetSelectedSeats: (seats: Seat[]) => void;
  bookedSeats: Set<string>;
}

export const AgenticAssistant: React.FC<AgenticAssistantProps> = ({
  catalog,
  onSelectMovie,
  onSetSelectedSeats,
  bookedSeats
}) => {
  const [prompt, setPrompt] = useState('');

  const handleRunAgentAction = () => {
    if (!prompt.trim()) return;
    const lower = prompt.toLowerCase();

    // 1. Movie identification agent rule
    const matchedMovie = catalog.find(
      (m) =>
        lower.includes(m.title.toLowerCase()) ||
        lower.includes(m.title.split(':')[0].toLowerCase())
    );

    const activeMovie = matchedMovie || catalog[0];
    if (matchedMovie) {
      onSelectMovie(matchedMovie);
    }

    // 2. Category preference (Platinum, Gold, Silver)
    let targetCat: 'PLATINUM' | 'GOLD' | 'SILVER' | null = null;
    if (lower.includes('platinum')) targetCat = 'PLATINUM';
    else if (lower.includes('gold')) targetCat = 'GOLD';
    else if (lower.includes('silver')) targetCat = 'SILVER';

    // 3. Number of seats requested
    let seatCount = 2;
    const matchNum = lower.match(/\b([1-9])\s*(seat|seats|ticket|tickets)\b/);
    if (matchNum) {
      seatCount = parseInt(matchNum[1], 10);
    }

    // 4. Find optimal seats
    const rows = [
      { label: 'A', category: 'PLATINUM' as const, multiplier: 1.5 },
      { label: 'B', category: 'GOLD' as const, multiplier: 1.25 },
      { label: 'C', category: 'GOLD' as const, multiplier: 1.25 },
      { label: 'D', category: 'SILVER' as const, multiplier: 1.0 },
      { label: 'E', category: 'SILVER' as const, multiplier: 1.0 }
    ];

    const foundSeats: Seat[] = [];
    for (const r of rows) {
      if (targetCat && r.category !== targetCat) continue;
      const candidateList: Seat[] = [];

      for (let i = 1; i <= 10; i++) {
        const seatId = `${r.label}-${i.toString().padStart(2, '0')}`;
        if (!bookedSeats.has(seatId)) {
          candidateList.push({
            id: seatId,
            rowLabel: r.label,
            seatNumber: i,
            category: r.category,
            price: Math.round(activeMovie.basePrice * r.multiplier),
            status: 'SELECTED'
          });

          if (candidateList.length === seatCount) {
            foundSeats.push(...candidateList);
            break;
          }
        } else {
          candidateList.length = 0;
        }
      }
      if (foundSeats.length === seatCount) break;
    }

    if (foundSeats.length > 0) {
      onSetSelectedSeats(foundSeats);
      alert(`🤖 Agentic AI: Auto-selected ${foundSeats.length} seats (${foundSeats.map((s) => s.id).join(', ')}) for ${activeMovie.title}!`);
    } else {
      alert("🤖 Agentic AI: Couldn't find exact consecutive seats for that request. Try a different category or count!");
    }
  };

  return (
    <section className="ai-agent-bar">
      <div className="ai-badge">
        ✨ <span>BOOKIT AI Agent</span>
      </div>
      <input
        type="text"
        className="ai-input"
        placeholder="Ask Agentic AI: e.g. 'Select 2 Gold seats for Godzilla' or 'Find 3 tickets under ₹600'..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleRunAgentAction()}
      />
      <button className="ai-btn" onClick={handleRunAgentAction}>
        Run Agentic Action
      </button>
    </section>
  );
};
