/*
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule, NgFor } from '@angular/common'; // ✅ import NgFor explicitly

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, NgFor], // ✅ add NgFor (or CommonModule covers it too)
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  options: any[] = [];

  ngOnInit() {
    this.fetchOptions();
  }

  fetchOptions() {
    axios.get('http://localhost:3000/poll')
      .then(res => this.options = res.data)
      .catch(err => console.error(err));
  }

  vote(id: string) {
    axios.put(`http://localhost:3000/poll/${id}`)
      .then(() => this.fetchOptions())
      .catch(err => console.error(err));
  }
}
*/
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  options: any[] = [];
  showAddForm = false;
  newOption = '';
  message = '';

  ngOnInit() {
    this.loadPolls();
  }

  loadPolls() {
    axios.get('http://localhost:3000/poll')
      .then(res => {
        this.options = res.data;
      })
      .catch(err => console.error('Error loading polls:', err));
  }

  vote(optionId: string) {
    axios.put(`http://localhost:3000/poll/${optionId}`)
      .then(() => this.loadPolls());
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.message = '';
  }

  addOption() {
    if (!this.newOption.trim()) {
      this.message = '⚠️ Option cannot be empty!';
      return;
    }

    axios.post('http://localhost:3000/poll', { option: this.newOption })
      .then(() => {
        this.message = '✅ Option added successfully!';
        this.newOption = '';
        this.showAddForm = false;
        this.loadPolls();
      })
      .catch(err => {
        console.error('❌ Error:', err);
        this.message = '❌ Failed to add option.';
      });
  }
}
