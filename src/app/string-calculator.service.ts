import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringCalculatorService {
  add(numbers: string): number {
    if (numbers === '') {
      return 0;
    }

    let delimiter = /[\n,]/; // Default delimiters are new lines and commas

    // Check if a custom delimiter is specified
    if (numbers.startsWith('//')) {
      // Extract the custom delimiter and numbers part
      const delimiterEndIndex = numbers.indexOf('\n');
      const customDelimiterPart = numbers.substring(2, delimiterEndIndex).trim(); // Extract and trim the custom delimiter

      // Escape special characters in the delimiter for regex
      const escapedDelimiter = customDelimiterPart
        .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
      delimiter = new RegExp(escapedDelimiter); // Use the custom delimiter

      // Extract the numbers part after the delimiter line
      numbers = numbers.substring(delimiterEndIndex + 1);
    } else {
      // Replace escaped new lines (\\n) with actual new lines
      numbers = numbers.replace(/\\n/g, '\n');
    }

    // Replace all new lines and carriage returns with commas
    numbers = numbers.replace(/[\r\n]+/g, ',');

    // Split the numbers using the delimiter
    const numArray = numbers.split(delimiter).filter(num => num.trim() !== '');
    console.log('Split numbers:', numArray); // Debug log

    // Filter out negative numbers and throw an error if any are found
    const negatives = numArray.filter(num => parseInt(num, 10) < 0);
    if (negatives.length > 0) {
      throw new Error(`negative numbers not allowed ${negatives.join(', ')}`);
    }

    // Calculate the sum, defaulting to 0 if parsing fails
    return numArray.reduce((sum, num) => sum + (parseInt(num, 10) || 0), 0);
  }
}
