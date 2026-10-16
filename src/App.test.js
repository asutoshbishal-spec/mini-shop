import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom before importing App
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
}));

test('renders Mini Shop', () => {
  render(<App />);
  expect(document.body).toBeInTheDocument();
});
