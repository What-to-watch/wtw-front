import React from 'react';
import MovieCard from './components/MovieCard';

function App() {
  return (
    <div style={{display: 'flex', width: '100%', flexWrap:'wrap'}}>
        <MovieCard 
          title="Inglourious Basterds" 
          genres={["Action","War","Drama","Comedy"]}
          id={1}
          src='movie-posters/1.jpg'
          hue={200}
        />
        <MovieCard />
    </div>
  );
}

export default App;
