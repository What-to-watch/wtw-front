import React from 'react';
import Pagination from './index';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe ('Pagination render', ()=>{
    let props = {
        page: 1,
        pages: 5,
        total: 450,
        perPage: 100,
        length: 100,
    }
    let component = renderer.create(
        (<Pagination {...props}/>),
    );

    let pagination = component.toJSON();

    it('Pagination render first page', ()=>{

        const first = ( props.perPage * props.page ) - props.perPage + 1;
        const last = first + props.length - 1;

        const disabledButtons = component.root.findAllByProps({disabled: true});
        const descriptionText = component.root.findAllByType('span');

        expect(disabledButtons.length).toBe(2);
        expect(descriptionText[0].children[0]).toBe(first.toString())
        expect(descriptionText[2].children[0]).toBe(last.toString())

        expect(pagination).toMatchSnapshot();

    });

    it('Pagination render last page', () => {
        props = { ...props, page: 5 } 
        component = renderer.create(
            (<Pagination {...props}/>),
        );

        pagination = component.toJSON();

        const first = ( props.perPage * props.page ) - props.perPage + 1;
        const last = first + props.length - 1;

        const disabledButtons = component.root.findAllByProps({disabled: true});
        const descriptionText = component.root.findAllByType('span');

        expect(disabledButtons.length).toBe(2);
        expect(descriptionText[0].children[0]).toBe(first.toString())
        expect(descriptionText[2].children[0]).toBe(last.toString())

        expect(pagination).toMatchSnapshot();
    })

    it('Pagination render in between page', () => {
        props = { ...props, page: 3 } 
        component = renderer.create(
            (<Pagination {...props}/>),
        );

        pagination = component.toJSON();

        const first = ( props.perPage * props.page ) - props.perPage + 1;
        const last = first + props.length - 1;

        const disabledButtons = component.root.findAllByProps({disabled: false});
        const descriptionText = component.root.findAllByType('span');

        expect(disabledButtons.length).toBe(4);
        expect(descriptionText[0].children[0]).toBe(first.toString())
        expect(descriptionText[2].children[0]).toBe(last.toString())

        expect(pagination).toMatchSnapshot();
    })
    it('Pagination ChangePage is executed with button', ()=>{
        const spy = (() => {
            let _spy = (...args) => {
                _spy.calls.push({ args })
                _spy.called = true;
                _spy.callCount = _spy.callCount+1;
            }
            _spy.calls = [];
            _spy.called = false;
            _spy.callCount = 0;
            Object.defineProperty(_spy,"firstCall",{
                get: () => _spy.calls[0]
            })
            return _spy
        })()

        props = { ...props, changePage: spy }

        render(<Pagination {...props} />);

        fireEvent.click(screen.getAllByRole('button')[0]);

        expect(spy.called).toBeTruthy();
        expect(spy.callCount).toBe(1);
        expect(spy.firstCall.args[0]).toBe(1);
    });

})