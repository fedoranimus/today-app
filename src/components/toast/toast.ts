import { autoinject } from 'aurelia-framework';
import { Store } from '../../models/store';

@autoinject
export class Toast {
    isDisplayed = false;
    message: string = "";
    canUndo = false;

    constructor(private store: Store) {
        store.toastSubject.subscribe(
            response => this.show(response)
        );
    }

    show(toast: ToastMessage) {
        this.isDisplayed = true;
        this.message = toast.message;
        this.canUndo = toast.canUndo;

        setTimeout(() => {
            this.message = "";
            this.canUndo = false;
            this.isDisplayed = false;
        }, 5000);
    }

    undo() {
        this.store.undo();
    }
}

export interface ToastMessage {
    message: string;
    canUndo: boolean;
}