import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { TasksService } from '../../services/tasks.service';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { TaskDto } from '../../dto/task.dto';
import { TaskRepository } from '../../repositories/task.repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
  ],
  providers: [
    TasksService,
    TaskRepository
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent { 
  frmGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    description: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    dueDate: new FormControl(null, [Validators.required]),
    isCompleted: new FormControl(null)
  })


  constructor(
    private readonly _taskService: TasksService,
    private readonly _alertService: AlertsService,
    private readonly _router: Router,
  ) {}

  async onFormSubmit() {

    if( !this.frmGroup.valid ) {
      this._alertService.SwalError('Information', 'Check ___');
      return;
    }

    this._alertService.SwalLoading('Information', 'Wait a moment.');
    
    const { title, description, dueDate, isCompleted } = this.frmGroup.value;

    const task: TaskDto = new TaskDto();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.isCompleted = isCompleted ?? false;


  
    try {
      await this._taskService.create(task);
      this.clearForm();
      this._alertService.SwalSuccess('Information', 'The task was created correctly.');
      this._router.navigate(['/tasks/list']);
    } catch (error) {
      this._alertService.SwalError('Error', 'An error occurred.');
    }
  }

  clearForm() {
    this.frmGroup.reset();
  }
}
