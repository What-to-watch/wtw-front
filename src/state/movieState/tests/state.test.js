import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { movies, MoviesProvider } from '../index';

import { 
    setResultsPerPage
} from '../actions';

describe('Provider test', () => {
    const { Consumer } = movies;
    it('test state init value', () => {
        const tree = (
            <MoviesProvider>
                <Consumer>
                    { value => <span>value: {value.state.resultsPerPage}</span>}
                </Consumer>
            </MoviesProvider>
        );
        const rendered = render(tree);
        expect(rendered.getByText(/^value:/)).toHaveTextContent('value: 100');
    });
    it('dispatch change value', () => {
        const tree = (
            <MoviesProvider>
                <Consumer>
                    { value => (
                        <>
                            <button onClick={()=>value.dispatch(setResultsPerPage(1000))}>1000</button>
                            <span>value: {value.state.resultsPerPage}</span>
                        </>
                    )}
                </Consumer>
            </MoviesProvider>
        );
        const rendered = render(tree);

        fireEvent.click(screen.getByText('1000'));

        expect(rendered.getByText(/^value:/)).toHaveTextContent('value: 1000');
    })
})