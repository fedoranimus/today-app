

export class PendingList {
    tasks: any[] = [];

    constructor() {

    }

    allowDrop(ev: DragEvent) {
        ev.preventDefault();
    }

    drop(ev: DragEvent) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData("task");
        console.log(data);
        //(<any>ev.currentTarget).appendChild(document.getElementById(data));
        return false;
    }

    drag(ev: DragEvent) {
        ev.dataTransfer.setData("task", (<any>ev.target).model);
        return true;
    }

    get hasTask() {
        return this.tasks.length > 0 ? true : false;
    }
}