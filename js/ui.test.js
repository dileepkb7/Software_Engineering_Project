import { generatePlayerInputs } from '../js/ui.js';
import { JSDOM } from 'jsdom';

describe('generatePlayerInputs function', () => {
  let container;

  beforeEach(() => {
    // Create a mock DOM environment
    const dom = new JSDOM('<!DOCTYPE html><body><div id="player-names-container"></div></body>');
    container = dom.window.document.getElementById('player-names-container');
  });

  test('should generate the correct number of input fields', () => {
    generatePlayerInputs(3, container);
    expect(container.children.length).toBe(3);
  });

  test('should assign correct placeholders for inputs', () => {
    generatePlayerInputs(2, container);
    expect(container.children[0].placeholder).toBe('Enter Player 1 Name');
    expect(container.children[1].placeholder).toBe('Enter Player 2 Name');
  });

  test('should clear previous inputs before generating new ones', () => {
    generatePlayerInputs(2, container);
    generatePlayerInputs(3, container);
    expect(container.children.length).toBe(3);
  });
});
