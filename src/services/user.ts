import TodoistAPI from 'todoist-js';
import { Container } from 'aurelia-dependency-injection';
import { autoinject, Aurelia } from 'aurelia-framework';
import { Storage } from './storage';

export interface IProjectLocation {
    projectId: number;
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


    constructor(private container: Container, private storage: Storage) {
        this.init();
    }

    private async init() {
        const settings = await this.storage.get(null);
        console.log('Saved Settings', settings);

        navigator.geolocation.getCurrentPosition((position) => {
            this._currentLocation = position
        });
    }

    addProjectLocation(projectId: number) {

    }

    removeProjectLocation(projectId: number) {

    }

    get currentProject() {
        return navigator.geolocation.getCurrentPosition( (location) => {
            this.getNearestProject(location);
        });
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

    private getNearestProject(currentLocation: Position): number | null {
        let projects: any[] = [];
        this._projectLocations.forEach((project) => {
            const distance = this.calculateHaversineDistance(currentLocation, project.projectLocation);
            if(distance < this._locationThreshold) {
                projects.push({ projectId: project.projectId, distance: distance });
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
}