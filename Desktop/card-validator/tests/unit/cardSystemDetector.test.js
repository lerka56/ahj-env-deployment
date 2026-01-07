import { detectCardSystem } from '../../src/js/cardSystemDetector.js';

describe('Card System Detection', () => {
  test('should detect Visa cards', () => {
    expect(detectCardSystem('4111111111111111')).toBe('visa');
    expect(detectCardSystem('4')).toBe('visa');
  });
  
  test('should detect Mastercard cards', () => {
    expect(detectCardSystem('5111111111111111')).toBe('mastercard');
    expect(detectCardSystem('5555555555554444')).toBe('mastercard');
    expect(detectCardSystem('2720999999999999')).toBe('mastercard');
  });
  
  test('should detect Mir cards', () => {
    expect(detectCardSystem('2200111111111111')).toBe('mir');
    expect(detectCardSystem('2204')).toBe('mir');
  });
  
  test('should detect American Express cards', () => {
    expect(detectCardSystem('341111111111111')).toBe('amex');
    expect(detectCardSystem('371111111111111')).toBe('amex');
  });
  
  test('should return unknown for unknown systems', () => {
    expect(detectCardSystem('1234567890123456')).toBe('unknown');
    expect(detectCardSystem('')).toBe('unknown');
    expect(detectCardSystem(null)).toBe('unknown');
  });
  
  test('should handle spaces and formatting', () => {
    expect(detectCardSystem('4111 1111 1111 1111')).toBe('visa');
  });
});