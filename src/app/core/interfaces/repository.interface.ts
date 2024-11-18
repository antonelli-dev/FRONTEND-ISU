export interface Repository<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T>;
    deleteById(id: number): Promise<boolean>;
    create(task: T): Promise<T>;
    update(task: T): Promise<T>;
};