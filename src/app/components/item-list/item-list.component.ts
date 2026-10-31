import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Subject, StudentRecord } from '../../services/api.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {
  subjects: Subject[] = [];
  firstName: string = '';
  lastName: string = '';
  scores: { [key: number]: number } = {};
  lastResult: StudentRecord | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.apiService.getSubjects().subscribe(data => {
      this.subjects = data;
      this.subjects.forEach(sub => this.scores[sub.id] = 0);
    });
  }

  onSubmit(): void {
    const payload = { firstName: this.firstName, lastName: this.lastName, scores: this.scores };
    this.apiService.calculateGpa(payload).subscribe(result => {
      this.lastResult = result;
      this.firstName = '';
      this.lastName = '';
      this.subjects.forEach(sub => this.scores[sub.id] = 0);
    });
  }
}