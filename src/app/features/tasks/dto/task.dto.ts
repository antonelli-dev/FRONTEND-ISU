export class TaskDto {
    public taskId: number = 0;
    public title: string = '';
    public description: string = '';
    public dueDate: Date = new Date();
    public isCompleted: boolean = false;
};