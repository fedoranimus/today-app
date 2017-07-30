import * as moment from 'moment';

export class DueDateValueConverter {
    toView(value: string, format: string) {
        if(value)
            return moment(value).format(format);
    }
}