import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TasksService } from '../../services/tasks.service';
import { Router, RouterLink } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { MatTableDataSource } from '@angular/material/table';
import { TaskRepository } from '../../repositories/task.repository';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [CommonModule, CoreModule, RouterLink],
  providers: [TaskRepository, TasksService],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTasksComponent {
  tasks = new MatTableDataSource();
  displayedColumns: string[] = [
    'taskId',
    'title',
    'description',
    'dueDate',
    'isCompleted',
    'actions',
  ];

  constructor(
    private readonly _tasksService: TasksService,
    private readonly _router: Router,
    private readonly _alertsService: AlertsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadTasks();
  }

  async loadTasks() {
    const lastTasks = await this._tasksService.getAll();
    this.tasks.data = [...lastTasks];
  }

  async deleteTask(id: number) {
    this._alertsService.SwalQuestion(
      'Information',
      'Are you sure?',
      async () => {
        try {
          this._alertsService.SwalLoading(
            'Information',
            'We are deleting the task . . .'
          );
          await this._tasksService.delete(id);
          await this.loadTasks();
          this._alertsService.SwalSuccess('Information', 'Task deleted');
        } catch (error) {
          this._alertsService.SwalError('Information', 'An error occurred.');
        }
      }
    );
  }

  editTask(taskId: number) {
    this._router.navigate([`/task/edit/${taskId}`]);
  }

  delete(taskId: number) {
    this._router.navigate([`/task/edit/${taskId}`]);
  }

  createTask() {
    this._router.navigate([`/task/create`]);
  }
}
