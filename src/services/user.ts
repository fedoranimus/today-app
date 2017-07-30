import TodoistAPI from 'todoist-js';
import { Container } from 'aurelia-dependency-injection';
import { autoinject, Aurelia } from 'aurelia-framework';
import { Storage } from './storage';

export interface IProjectLocation {
    projectId: number;
    projectName: string;
    projectLocation: Position;
}

@autoinject
export class User {
    private _pomodoroGoal: number = 8;
    private _focusLength: number = 25;
    private _breakLength: number = 5;
    private _longBreakLength: number = 15;
    private _breakCount: number = 4;
    private _apiToken: string;
    private _currentLocation: Position;

    private _locationThreshold: number = 1;

    private _pomodoroCount: number = 0;

    private _projectLocations: IProjectLocation[] = [];

    private _activeProject: { projectId: number, projectName: string, distance: number } | null;
    //private _projectReason: "location" | "override" | "none";

    constructor(private container: Container, private storage: Storage) {
        this.init();
    }

    private async init() {
        const settings = await this.storage.get(null);
        this._projectLocations = JSON.parse((<any>settings).projectLocations);
        this._activeProject = (<any>settings).activeProject;
        console.log('Saved Settings', settings);

        // if(this._projectReason == "location") {
        //     this.setActiveProject("location"); //ensure this initialized
        // }

        navigator.geolocation.getCurrentPosition((position) => {
            this._currentLocation = position
            this._activeProject = this.getNearestProject(position);
        });
    }

    addProjectLocation(projectId: number, projectName: string) {
        console.log(projectId, projectName, this._currentLocation, this._projectLocations);
        if(!this._projectLocations.some((element) => {
            return element.projectId === projectId || this.getNearestProject(this._currentLocation) !== null; 
        })) {
            console.debug("pushing project");
            this._projectLocations.push({ projectId: projectId, projectName: projectName, projectLocation: this._currentLocation });
        }
        let stringLocations = JSON.stringify(this._projectLocations.map((projectLocation) => {
            return { projectId: projectLocation.projectId, projectName: projectLocation.projectName, projectLocation: this.geopositionToObject(projectLocation.projectLocation) };
        }));
        console.log(this._projectLocations, stringLocations);

        this.storage.set({ projectLocations: stringLocations });

        return this._projectLocations;
    }

    removeProjectLocation(projectId: number) {
        this._projectLocations = this._projectLocations.filter(obj => { 
            return obj.projectId !== projectId;
        });

        let stringLocations = JSON.stringify(this._projectLocations.map((projectLocation) => {
            return { projectId: projectLocation.projectId, projectName: projectLocation.projectName, projectLocation: this.geopositionToObject(projectLocation.projectLocation) };
        }));

        this.storage.set({ projectLocations: stringLocations });

        return this._projectLocations;
    }

    // setActiveProject(projectId: number | null = null) {
    //     navigator.geolocation.getCurrentPosition( (location) => {
    //         this._activeProject = this.getNearestProject(location);
    //     });

    //     //this.storage.set({ projectReason: reason });
    //     this.storage.set({ activeProject: this._activeProject });
    // }

    get projectLocations() {
        return this._projectLocations;
    }

    get activeProject() {
        return this._activeProject;
    }

    get pomodoroCount() {
        return this._pomodoroCount;
    }

    set pomodoroCount(count: number) {
        this._pomodoroCount = count;
        this.storage.set({ pomodoroCount: count });
    }

    get pomodoroGoal() {
        return this._pomodoroGoal;
    }

    set pomodoroGoal(goal: number) {
        this._pomodoroGoal = goal;
        this.storage.set({ pomodoroGoal: goal });
    }

    get focusLength() {
        return this._focusLength;
    }

    set focusLength(length: number) {
        this._focusLength = length;
        this.storage.set({ focusLength: length });
    }

    get breakLength() {
        return this._breakLength;
    }

    set breakLength(length: number) {
        this._breakLength = length;
        this.storage.set({ breakLength: length });
    }

    get longBreakLength() {
        return this._longBreakLength;
    }

    set longBreakLength(length: number) {
        this._longBreakLength = length;
        this.storage.set({ longBreakLength: length });
    }

    get breakCount() {
        return this._breakCount;
    }

    set breakCount(count: number) {
        this._breakCount = count;
        this.storage.set({ breakCount: count });
    }

    get apiToken() {
        return this._apiToken;
    }

    set apiToken(apiToken: string) {
        this._apiToken = apiToken;
        this.storage.set({ todoistToken: apiToken });
        this.container.unregister(TodoistAPI);
        this.container.registerInstance(TodoistAPI, new TodoistAPI(this._apiToken));
    }

    private getNearestProject(currentLocation: Position): { projectId: number, projectName: string, distance: number } | null {
        let projects: any[] = [];
        this._projectLocations.forEach((project) => {
            const distance = this.calculateHaversineDistance(currentLocation, project.projectLocation);
            if(distance < this._locationThreshold) {
                projects.push({ projectId: project.projectId, projectName: project.projectName, distance: distance });
            }
        });

        if(projects.length > 0) {
            projects.sort((a, b) => {
                return a.distance - b.distance;
            });
            return projects[0];
        } else {
            return null;
        }
    }

    private toRad(x: number) {
        return x * Math.PI / 180;
    }

    private calculateHaversineDistance(currentLocation: Position, savedLocation: Position) {
        const R = 6371;
        const dLat = this.toRad(savedLocation.coords.latitude - currentLocation.coords.latitude);
        const dLong = this.toRad(savedLocation.coords.longitude - currentLocation.coords.longitude);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(this.toRad(currentLocation.coords.latitude)) * Math.cos(this.toRad(savedLocation.coords.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;

        return Math.round(d);
    }

    private geopositionToObject(geoposition: Position) {
        return {
            timestamp: geoposition.timestamp,
            coords: {
                accuracy: geoposition.coords.accuracy,
                altitude: geoposition.coords.altitude,
                altitudeAccuracy: geoposition.coords.altitudeAccuracy,
                heading: geoposition.coords.heading,
                latitude: geoposition.coords.latitude,
                longitude: geoposition.coords.longitude,
                speed: geoposition.coords.speed
            }
        }
    }
}