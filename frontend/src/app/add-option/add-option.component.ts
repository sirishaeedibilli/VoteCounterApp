import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-option',
  standalone: true,
  imports: [FormsModule, CommonModule], // ✅ both required
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.css']
})
export class AddOptionComponent {
  newOption: string = '';
  message: string = '';

  addOption() {
    if (!this.newOption.trim()) {
      this.message = '⚠️ Option cannot be empty!';
      return;
    }

    axios.post('http://localhost:3000/poll', { option: this.newOption })
      .then(() => {
        this.message = '✅ Option added successfully!';
        this.newOption = '';
      })
      .catch(err => {
        console.error(err);
        this.message = '❌ Failed to add option.';
      });
  }
}
