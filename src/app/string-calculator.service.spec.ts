import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringCalculatorService]
    });
    service = TestBed.inject(StringCalculatorService);
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toBe(0);
  });

  it('should return the number itself for a single number string', () => {
    expect(service.add('1')).toBe(1);
  });

  it('should return the sum of two numbers', () => {
    expect(service.add('1,2')).toBe(3);
  });

  it('should return the sum of multiple numbers', () => {
    expect(service.add('1,2,3')).toBe(6);
  });

  it('should handle new lines between numbers', () => {
    expect(service.add('1\n2,3')).toBe(6);
  });

  it('should handle different delimiters', () => {
    expect(service.add('//;\n1;2')).toBe(3);
  });

  it('should throw an exception for negative numbers', () => {
    expect(() => service.add('1,-2,3')).toThrow('negative numbers not allowed -2');
  });
});
