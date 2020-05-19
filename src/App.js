import React from 'react';
import MovieCard from './components/MovieCard';
import List from './components/List';

function App() {
  return (
    <div style={{display: 'flex', width: '100%', flexWrap:'wrap'}}>
        <MovieCard 
          title="Inglourious Basterds" 
          genres={["Action","War","Drama","Comedy"]}
          color="red"
          id={1}
          src='movie-posters/1.jpg'
        />
        <div style={{ margin: "10px" }}>
          <List 
            content={[
              "Comedy","Coca cola","Pinteco"
            ]}
            search="Co"
          />
        </div>
        <div style={{ margin: "10px" }}>
          <List search="H">
            <List.Item>Hello?</List.Item>
            <List.Item>Howdy do?</List.Item>
          </List>
        </div>
    </div>
  );
}

export default App;
