import React, { useState } from 'react';
import { ContentItem } from '../types';

interface MovieCatalogProps {
  catalog: ContentItem[];
  selectedMovieId: number;
  onSelectMovie: (movie: ContentItem) => void;
}

export const MovieCatalog: React.FC<MovieCatalogProps> = ({
  catalog,
  selectedMovieId,
  onSelectMovie
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter movies dynamically based on search query
  const filtered = catalog.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <aside className="column-card">
      <div className="catalog-header">
        <h2 className="column-title">Film & Shows</h2>
        <span className="badge-pill">{filtered.length} Available</span>
      </div>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by title, genre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="movie-grid">
        {filtered.map((movie) => (
          <div
            key={movie.id}
            className={`movie-item ${movie.id === selectedMovieId ? 'active' : ''}`}
            onClick={() => onSelectMovie(movie)}
          >
            <img src={movie.posterUrl} alt={movie.title} loading="lazy" />
            <div className="movie-item-overlay">
              <div className="movie-item-title">{movie.title}</div>
              <div className="movie-item-genre">{movie.genres.join(' • ')}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-btn">View All Categories & Events</button>
    </aside>
  );
};
