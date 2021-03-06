import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import renderer from 'react-test-renderer';
import List, { Item } from './';
import { Spy } from '../../utils/testing'

describe("List rendering", () => {
    it("renders correctly", () => {
        const content = [
            "Comedy", "Drama", "Documentary"
        ]
        const comp = render(<List content={content}/>)
        expect(comp.asFragment()).toMatchSnapshot();
    })

    it("content prop rendering", () => {
        const content = [
            "Comedy", "Drama", "Documentary"
        ]
        const comp = render(<List content={content}/>)

        expect(comp.queryAllByRole("list")).toHaveLength(1);
        expect(comp.queryAllByRole("listitem")).toHaveLength(content.length);
    })

    it("children rendering", () => {
        const content = [
            "Comedy", "Drama", "Documentary"
        ]
        const comp = render(<List>
            <Item>Comedy</Item>
            <Item>Drama</Item>
            <Item>Documentary</Item>
        </List>)

        expect(comp.queryAllByRole("list")).toHaveLength(1);
        expect(comp.queryAllByRole("listitem")).toHaveLength(content.length);
    })
})

describe("List behavior", () => {
    it("should highlight given a search prop (case insensitive)", () => {
        const content = [
            "Coca cola", "Comedy", "Pintuco"
        ]
        const keyword = "co";
        const comp = renderer.create(<List content={content} keyword={keyword}/>)
        expect(comp.root.findAllByType("strong")).toHaveLength(4)
    })

    it("should receive value and props on click", () => {
        const content = [
            { label: "Coca cola", value: "Something else" }
        ]
        const spy = Spy()
        render(<List content={content} onItemClick={spy} />)
        fireEvent.click(screen.getByText('Coca cola'))

        expect(spy.called).toBeTruthy();
        expect(spy.callCount).toBe(1);
        expect(spy.firstCall.args[0]).toBe(content[0].value)
    })
})