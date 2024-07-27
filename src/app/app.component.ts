import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringCalculatorService } from './string-calculator.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[StringCalculatorService]
})
export class AppComponent {
  title = 'tdddemo';
  input = '';
  result = 0;
  error = '';

  constructor(private stringCalculatorService: StringCalculatorService) {}

  calculate(): void {
    try {
      this.result = this.stringCalculatorService.add(this.input);
      this.error = '';
    } catch (e:any) {
      this.error = e.message;
      this.result = 0;
    }
  }
}
