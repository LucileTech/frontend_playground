import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

// Mock the SearchGifs component
jest.mock('./components/SearchGifs/SeachGifs', () => () => <div data-testid="search-gifs">SearchGifs Component</div>);

test('renders SearchGifs component', () => {
  render(<App />);
  const searchGifsElement = screen.getByTestId('search-gifs');
  expect(searchGifsElement).toBeInTheDocument();
});
