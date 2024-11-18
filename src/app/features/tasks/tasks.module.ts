import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CoreModule } from "src/app/core/core.module";
import { taskRouting } from "./tasks.routing";

@NgModule({
    imports: [
        CoreModule,
        RouterModule.forChild(taskRouting)
    ]
})
export class TasksModule {}