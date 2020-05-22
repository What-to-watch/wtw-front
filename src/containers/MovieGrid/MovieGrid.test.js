import React from 'react';
import { LoadingMovieGrid } from './index';
import renderer from 'react-test-renderer';

describe('Movie Grid rendering', () => {
    it('LoadingMovieGrid correctly rendering', () => {
        const props = { length: 100, hue: '200' };
        const component = renderer.create(
            (<LoadingMovieGrid {...props}/>),
        );

        const loadingMovieGrid = component.toJSON();

        expect(loadingMovieGrid).toMatchSnapshot();

        const cards = component.root.findAllByProps({className: "loading-movie-card"});
        expect(cards).toHaveLength(props.length);
    })
}) 