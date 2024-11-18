import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { TaskRepository } from '../../repositories/task.repository';
import { TasksService } from '../../services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/core/services/alerts.service';
import { TaskDto } from '../../dto/task.dto';

@Component({
  selector: 'app-detail-task',
  standalone: true,
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [
    TasksService,
    TaskRepository
  ],
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailTaskComponent { 
  task: TaskDto = new TaskDto();

  frmGroup: FormGroup = new FormGroup({
    title: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]),
    description: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]),
    dueDate: new FormControl({ value: null, disabled: true }, [Validators.required]),
    isCompleted: new FormControl({ value: null, disabled: true })
  })


  constructor(
    private readonly _taskService: TasksService,
    private readonly _alertService: AlertsService,
    private readonly _activeRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this._alertService.SwalLoading('Information', 'We are procesing the request, please wait ...');

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
}
