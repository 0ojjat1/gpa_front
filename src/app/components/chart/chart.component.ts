import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, StudentRecord } from '../../services/api.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="max-width: 850px; margin: auto; background: #fff; padding: 25px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); font-family: Tahoma, sans-serif; direction: rtl;">
      <h2 style="color: #2c3e50; text-align: center; margin-top: 0;">نمودار مقایسه معدل‌ها</h2>
      <div style="position: relative; width: 100%; height: 400px; margin-top: 20px;">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `
})
export class ChartComponent implements AfterViewInit {
  records: StudentRecord[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: any;

  constructor(private apiService: ApiService) {}

  ngAfterViewInit(): void {
    this.apiService.getRecords().subscribe(data => {
      this.records = data;
      this.renderChart();
    });
  }

  renderChart(): void {
    if (!this.chartCanvas) return;

    const labels = this.records.map(r => `${r.firstName} ${r.lastName}`);
    const dataValues = this.records.map(r => r.gpa);

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'معدل وزنی دانشجویان',
          data: dataValues,
          backgroundColor: 'rgba(52, 152, 219, 0.7)',
          borderColor: 'rgba(41, 128, 185, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });
  }
}