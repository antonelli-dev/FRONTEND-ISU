import { Injectable } from '@angular/core';
import { TaskRepository } from '../repositories/task.repository';
import { TaskDto } from '../dto/task.dto';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private readonly _taskRepository: TaskRepository
  ) { }

  async getAll(): Promise<TaskDto[]> {
    return await this._taskRepository.getAll();
  }

  async getById(id: number) {
    return await this._taskRepository.getById(id);
  }

  async create(task: TaskDto) {
    return await this._taskRepository.create(task);
  }

  async update(task: TaskDto) {
    return await this._taskRepository.update(task);
  }

  async delete(id: number) {
    return await this._taskRepository.deleteById(id);
  }

}
