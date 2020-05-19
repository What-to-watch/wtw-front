import React from 'react';
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer';
import List, { Item } from './';

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
    it("should highligh given a search prop (case insensitive)", () => {
        const content = [
            "Coca cola", "Comedy", "Pintuco"
        ]
        const keyword = "co";
        const comp = renderer.create(<List content={content} search={keyword}/>)
        expect(comp.root.findAllByType("strong")).toHaveLength(4)
    })
})