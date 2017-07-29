import { autoinject, bindable } from 'aurelia-framework';
import { User, IProjectLocation } from '../services/user';
import { TodoService } from '../services/todoService';
import { Project } from '../infrastructure/todoist';

@autoinject
export class Settings {
    fullName: string;
    
    @bindable projectLocations: IProjectLocation[];

    editProjectLocations = false;

    selectedProject: Project;

    projects: Project[];

    constructor(public user: User, private todoService: TodoService) {
        this.init();
    }

    private async init() {
        await this.getUser();
        await this.getProjects();
        console.log(this.user.projectLocations);
        this.projectLocations = this.user.projectLocations;
    }

    async getProjects() {
        this.projects = await this.todoService.getProjects();
        console.log(this.projects);
    }

    async getUser() {
        const userData = await this.todoService.getUser();
        this.fullName = userData.full_name;
    }

    addProject() {
        if(this.selectedProject) {
            this.user.addProjectLocation(this.selectedProject.id, this.selectedProject.name);
            this.projectLocations = this.user.projectLocations;
        }
    }

    deleteProject(id: number) {
        if(id) {
            this.user.removeProjectLocation(id);
        }
    }

    toggleProjectLocationEdit() {
        this.editProjectLocations = !this.editProjectLocations;
    }

}