import React from 'react';
import { render, unmountComponentAtNode,createRoot } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Timer from '../pages/Timer';

let container = null;

beforeEach(() => {
  // Set up a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Timer component', () => {
  test('renders with initial time', () => {
    act(() => {
      createRoot(container).render(<Timer />, container);
    });

    expect(container.textContent).toBe('01:00');
  });
});
