import React from 'react';
import MovieCard from './components/MovieCard';
import List from './components/List';
import Footer from './containers/Footer';

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
        <div style={{ margin: "10px" }}>
          <List 
            content={[
              { label: "Comedy", value: "COM" , data: "something else" },
              "Coca cola",
              "Pinteco"
            ]}
            keyword="Co"
            onItemClick={console.log}
          />
        </div>
        <div style={{ margin: "10px" }}>
          <List keyword="H">
            <List.Item>Hello?</List.Item>
            <List.Item>Howdy do?</List.Item>
          </List>
        </div>
        <Footer />
    </div>
  );
}

export default App;
