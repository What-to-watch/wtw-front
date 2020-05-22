import React from 'react';
import MovieCard, { LoadingMovieCard } from './index';
import renderer from 'react-test-renderer';

describe ('MovieCard render correctly', ()=>{
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

    it('Movie Card default value', ()=>{
        const defaultComponent = renderer.create(
            (<MovieCard hue={200}/>)
        );

        let moviecard2 = defaultComponent.toJSON();

        const titleNode = defaultComponent.root.findByType("h2");
        const genresNode = defaultComponent.root.findByType("p");

        expect(titleNode.children[0]).toBe('Movie1');

        expect(genresNode.children[0]).toBe('Comedy');

        expect(moviecard2).toMatchSnapshot();
    })
})

describe('Loading Movie Card Rendering', () => {
    it('LoadingMovieCard Correct Rendering', () => {
        const component = renderer.create(
            (<LoadingMovieCard hue={200} />),
        );
        let loadingmoviecard = component.toJSON();
        expect(loadingmoviecard).toMatchSnapshot();
    })
})