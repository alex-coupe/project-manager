import React from 'react';
import Spinner from '../Components/Core/Spinner'
import {render, cleanup} from '@testing-library/react';


afterEach(cleanup)

test('Spinner component renders to the DOM', () => {
    const {getByTestId} = render(<Spinner />);
    expect(getByTestId('spinner')).toMatchSnapshot();
});