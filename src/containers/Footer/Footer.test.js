import React from 'react';
import { render } from '@testing-library/react'
import Footer from './';

describe("Footer rendering", () => {
    const comp = render(<Footer/>)
    it('Footer Correct rendering', () => {
        expect(comp.asFragment()).toMatchSnapshot();
    })
});