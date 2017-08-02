import { Aurelia, PLATFORM, FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources(
        [
            PLATFORM.moduleName('./pomodoro/pomodoro'), 
            PLATFORM.moduleName('./task-list/task-list')
        ]);
}