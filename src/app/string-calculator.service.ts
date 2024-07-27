import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {
  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }

    // Handle custom delimiters if provided
    let delimiter = /[\n,]/; // Default delimiters are new lines and commas

    if (numbers.startsWith('//')) {
      const parts = numbers.split('\n');
      delimiter = new RegExp(parts[0].slice(2)); // Extract custom delimiter
      numbers = parts[1];
    } else {
      // Log the original input
      console.log('Original input:', JSON.stringify(numbers));

      // Replace escaped new lines (\\n) with actual new lines
      numbers = numbers.replace(/\\n/g, '\n');

      // Replace new lines and carriage returns with commas for consistent splitting
      numbers = numbers.replace(/[\r\n]+/g, ',');
      console.log('After replacing new lines:', JSON.stringify(numbers));
    }

    // Split the numbers using the delimiter
    const numArray = numbers.split(delimiter);
    console.log('Split numbers:', numArray);

    // Filter out negative numbers and throw an error if any are found
    const negatives = numArray.filter(num => parseInt(num, 10) < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }

    // Calculate the sum, defaulting to 0 if parsing fails
    return numArray.reduce((sum, num) => sum + (parseInt(num, 10) || 0), 0);
  }
}
