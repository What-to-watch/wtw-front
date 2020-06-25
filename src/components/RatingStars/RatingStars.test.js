import React from 'react';
import RatingStars from './index';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Spy } from '../../utils/testing'

describe ('RatingStars render', ()=>{
    let props = {
        rating: 4,
        onChange: x=>x,
    }
    let component = renderer.create(
        (<RatingStars {...props}/>),
    );

    let ratingStars = component.toJSON();

    it('RatingStars render', ()=>{

        const labels = component.root.findAllByType('label');

        expect(labels).toHaveLength(5);
        expect(ratingStars).toMatchSnapshot();

    });

    it('RatingStars onChange is executed with label', ()=>{
        const spy = Spy();

        props = { ...props, onChange: spy }

        render(<RatingStars {...props} />);

        fireEvent.click(screen.getAllByRole('radio')[0]);

        expect(spy.called).toBeTruthy();
        expect(spy.callCount).toBe(1);
        expect(spy.firstCall.args[0]).toBe(1);
    });

})