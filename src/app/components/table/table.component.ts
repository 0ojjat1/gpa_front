import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, StudentRecord } from '../../services/api.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 900px; margin: auto; background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); font-family: Tahoma, sans-serif; direction: rtl;">
      <h2 style="color: #2c3e50; text-align: center; margin-top: 0;">جدول اطلاعات و نمرات ثبت‌شده</h2>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; text-align: center;">
        <thead>
          <tr style="background: #34495e; color: white;">
            <th style="padding: 12px;">نام و نام خانوادگی</th>
            <th style="padding: 12px;">ریز نمرات و ضرایب</th>
            <th style="padding: 12px;">معدل وزنی</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let record of records; let i = index" [style.background-color]="i % 2 === 0 ? '#f8f9fa' : '#ffffff'" style="border-bottom: 1px solid #dee2e6;">
            <td style="padding: 12px; font-weight: bold;">{{ record.firstName }} {{ record.lastName }}</td>
            <td style="padding: 12px; text-align: right;">
              <div *ngFor="let ds of record.detailedScores" style="margin: 3px 0;">
                • {{ ds.subjectName }} (ضریب {{ ds.coefficient }}): <strong>{{ ds.score }}</strong>
              </div>
            </td>
            <td style="padding: 12px; font-weight: bold; color: #27ae60; font-size: 18px;">{{ record.gpa }}</td>
          </tr>
          <tr *ngIf="records.length === 0">
            <td colspan="3" style="padding: 25px; color: #7f8c8d;">هنوز هیچ داده‌ای ثبت نشده است.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TableComponent implements OnInit {
  records: StudentRecord[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRecords().subscribe(data => {
      this.records = data;
    });
  }
}