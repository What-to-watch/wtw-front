import React from 'react';
import Select from './index';
import { render, fireEvent, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe ('Select render correctly', ()=>{
    const resultOptions = [
        { label: '10', value: 10 },
        { label: '100', value: 100 },
        { label: '1000', value: 1000 }
    ]
    let props = {
        options: resultOptions,
        initValue: 100,
        onChange: x => x,
        open: false,
    }
    const component = renderer.create(
        (<Select {...props}/>),
    );

    let select = component.toJSON();
    const labelNode = component.root.findByProps({className: "select__button"}).children[0];

    expect(labelNode.children[0]).toBe(props.initValue.toString());

    expect(select).toMatchSnapshot();

    it('Select open', ()=>{
        props = { ...props, open: true }
        const openComponent = renderer.create(
            (<Select {...props}/>)
        );

        const openSelect = openComponent.root.findByProps({className: "select open"}).children;

        expect(openSelect).toHaveLength(2);
    })

    it('Select onClick is executed with button', ()=>{
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

        props = { ...props, onClick: spy }

        render(<Select {...props} />);

        fireEvent.click(screen.getByRole('button'));

        expect(spy.called).toBeTruthy();
        expect(spy.callCount).toBe(1);
        expect(spy.firstCall.args[0]).toStrictEqual(props);
    });
})