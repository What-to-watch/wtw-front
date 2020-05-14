import React from 'react';
import MovieCard from './index';
import renderer from 'react-test-renderer';

it('MovieCard render correctly', ()=>{
    const props = {
        title: "movie1",
        genres: ['Action', 'Comedy'],
        hue: 200,
        id: 1
    }
    const component = renderer.create(
        (<MovieCard {...props}/>),
    );

    let moviecard = component.toJSON();
    const titleNode = component.root.findByType("h2");
    const genresNode = component.root.findByType("p");

    expect(titleNode.children[0]).toBe(props.title);

    expect(genresNode.children[0]).toBe(props.genres.join('/'));

    expect(moviecard).toMatchSnapshot();
})