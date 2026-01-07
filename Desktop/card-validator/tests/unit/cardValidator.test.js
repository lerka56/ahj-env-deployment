import { luhnCheck } from '../../src/js/cardValidator.js';

describe('Luhn Algorithm Check', () => {
  test('should return true for valid Visa card', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);
  });
  
  test('should return true for valid Mastercard', () => {
    expect(luhnCheck('5555555555554444')).toBe(true);
  });
  
  test('should return true for valid Mir card', () => {
    expect(luhnCheck('2200000000000004')).toBe(true);
  });
  
  test('should return false for invalid card number', () => {
    expect(luhnCheck('4111111111111112')).toBe(false);
  });
  
  test('should handle spaces in card number', () => {
    expect(luhnCheck('4111 1111 1111 1111')).toBe(true);
  });
  
  test('should return false for short numbers', () => {
    expect(luhnCheck('123')).toBe(false);
  });
  
  test('should return false for non-string input', () => {
    expect(luhnCheck(null)).toBe(false);
    expect(luhnCheck(undefined)).toBe(false);
    expect(luhnCheck(4111111111111111)).toBe(false);
  });
});