import * as moment from 'moment';

export class GreetingValueConverter {
    toView(name: string) {
        let greeting: string;

        const afternoon = 12;
        const evening = 17;
        const currentHour = parseFloat(moment().format('HH'));
        
        if(currentHour >= afternoon && currentHour <= evening)
            greeting = `Good afternoon`; //, ${name}
        else if(currentHour >= evening)
            greeting = `Good evening`; //, ${name}
        else
            greeting = `Good morning`; //, ${name}

        return greeting;
    }
}