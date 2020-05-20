import React, { useState } from 'react';
import MovieCard from './components/MovieCard';
import SearchField from './components/SearchField'

function App() {
  const [value, setValue] = useState('');
  const onChange =(event) => setValue(event.target.value);
  const clearValue= ()=> setValue('')

  return (
    <div style={{display: 'flex', width: '100%', flexWrap:'wrap', background: '#2E2C2C', zIndex:-4}}>
        <MovieCard 
          title="Inglourious Basterds" 
          genres={["Action","War","Drama","Comedy"]}
          id={1}
          src='movie-posters/1.jpg'
          hue={200}
        />
        <MovieCard />
        <SearchField placeholder="Add genre" value={value} onChange={onChange} clearValue={clearValue} />

    </div>
  );
}

export default App;
