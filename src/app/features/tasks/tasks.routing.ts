import { Routes } from "@angular/router";
import { ListTasksComponent } from "./views/list-tasks/list-tasks.component";
import { MainLayoutComponent } from "src/app/core/layout/MainLayout/MainLayout.component";
import { CreateTaskComponent } from "./views/create-task/create-task.component";
import { EditTaskComponent } from "./views/edit-task/edit-task.component";
import { DetailTaskComponent } from "./views/detail-task/detail-task.component";

export const taskRouting: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'list',
                component: ListTasksComponent
            },
            {
                path: 'create',
                component: CreateTaskComponent
            },
            {
                path: 'edit/:id',
                component: EditTaskComponent
            },
            {
                path: 'detail/:id',
                component: DetailTaskComponent
            }
        ]
    }
];