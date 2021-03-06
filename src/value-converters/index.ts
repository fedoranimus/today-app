import { Aurelia, PLATFORM, FrameworkConfiguration } from 'aurelia-framework';

export function configure(config: FrameworkConfiguration) {
    config.globalResources(
        [
            PLATFORM.moduleName('./due-date-value-converter'),
            PLATFORM.moduleName('./greeting-value-converter'),
            PLATFORM.moduleName('./time-remaining-value-converter')
        ]);
}