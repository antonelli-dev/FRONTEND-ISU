import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { TasksService } from '../../services/tasks.service';
import { TaskRepository } from '../../repositories/task.repository';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { TaskDto } from '../../dto/task.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, CoreModule, ReactiveFormsModule],
  providers: [TasksService, TaskRepository],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTaskComponent implements OnInit {
  task: TaskDto = new TaskDto();

  frmGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    dueDate: new FormControl(null, [Validators.required]),
    isCompleted: new FormControl(null),
  });

  constructor(
    private readonly _taskService: TasksService,
    private readonly _alertService: AlertsService,
    private readonly _activeRoute: ActivatedRoute,
    private readonly _router: Router
  ) {}

  async ngOnInit() {
    this._alertService.SwalLoading(
      'Information',
      'We are procesing the request, please wait ...'
    );

    await this.loadTask();

    this.frmGroup.get('title')?.setValue(this.task.title);
    this.frmGroup.get('description')?.setValue(this.task.description);
    this.frmGroup.get('dueDate')?.setValue(this.task.dueDate);
    this.frmGroup.get('isCompleted')?.setValue(this.task.isCompleted);

    this._alertService.SwalClose();
  }

  async loadTask() {
    const taskId: number = this._activeRoute.snapshot.params['id'];
    this.task = await this._taskService.getById(taskId);
  }

  async onFormSubmit() {
    if (!this.frmGroup.valid) {
      this._alertService.SwalError('Information', 'Check ___');
      return;
    }

    this._alertService.SwalLoading('Information', 'Wait a moment.');

    const { title, description, dueDate, isCompleted } = this.frmGroup.value;

    const task: TaskDto = new TaskDto();
    const taskId: number = this._activeRoute.snapshot.params['id'];
    task.taskId = taskId;
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.isCompleted = isCompleted ?? false;

    try {
      await this._taskService.update(task);
      this._alertService.SwalSuccess('Information', 'The task was edited correctly.');
      this._router.navigate(['/tasks/list']);
    } catch (error) {
      this._alertService.SwalError('Error', 'An error occurred.');
    }
  }
}
