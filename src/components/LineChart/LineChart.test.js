import React from 'react';
import renderer from 'react-test-renderer';
import LineChart from './';

describe('LineChart Testing', () =>{
    it(('LineChart Snapshot', () => {
        const data = [
            {date: '2005', rating: 4 },
            {date: '2010', rating: 3 },
            {date: '2012', rating: 5 }
        ];

        const comp = renderer.create(<LineChart data={data} />)
        expect(comp.toJSON()).toMatchSnapshot();
    }))
})
