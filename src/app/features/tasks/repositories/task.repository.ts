import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Repository } from "src/app/core/interfaces/repository.interface";
import { TaskDto } from "../dto/task.dto";

@Injectable()
export class TaskRepository implements Repository<TaskDto> {

    private readonly baseUri: string = 'https://localhost:7075/api';
    private readonly _http: HttpClient = inject( HttpClient );

    update(task: TaskDto): Promise<TaskDto> {
        return lastValueFrom(this._http.put<TaskDto>(`${this.baseUri}/Task/${task.taskId}`, task));
    }
    
    create(task: TaskDto): Promise<TaskDto> {
        return lastValueFrom(this._http.post<TaskDto>(`${this.baseUri}/Task`, task));
    }

    getAll(): Promise<TaskDto[]> {
        return lastValueFrom(this._http.get<TaskDto[]>(`${this.baseUri}/Task`));
    }

    getById(id: number): Promise<TaskDto> {
        return lastValueFrom(this._http.get<TaskDto>(`${this.baseUri}/Task/${id}`));
    }

    deleteById(id: number): Promise<boolean> {
        return lastValueFrom(this._http.delete<boolean>(`${this.baseUri}/Task/${id}`));
    }
    
}