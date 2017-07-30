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

    activeProjectVal: number | string;

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
            this.projectLocations = this.user.addProjectLocation(this.selectedProject.id, this.selectedProject.name);
        }
    }

    deleteProject(id: number) {
        if(id) {
            this.projectLocations = this.user.removeProjectLocation(id);
        }
    }

    get activeProject() {
        return this.user.activeProject;
    }

    // setActiveProject() {
    //     if(this.activeProjectVal === "location") {
    //         this.user.setActiveProject("location");
    //     } else {
    //         this.user.setActiveProject(this.activeProjectVal);
    //     }
        
    // }

    // clearActiveProject() {
    //     this.user.setActiveProject("none");
    // }

    toggleProjectLocationEdit() {
        this.editProjectLocations = !this.editProjectLocations;
    }

}