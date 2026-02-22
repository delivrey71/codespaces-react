import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome screen with SwiftDeliver branding', () => {
  render(<App />);
  expect(screen.getByText('SwiftDeliver')).toBeDefined();
});

test('renders Log In button on welcome screen', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /log in/i })).toBeDefined();
});

test('renders Create Account button on welcome screen', () => {
  render(<App />);
  expect(screen.getByRole('button', { name: /create account/i })).toBeDefined();
});
