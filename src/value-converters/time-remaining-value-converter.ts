import * as moment from 'moment';
import 'moment-duration-format';

export class TimeRemainingValueConverter {
    toView(timeRemaining: number) {
        return moment.duration(timeRemaining, "milliseconds").format("h [Hours] m [Minutes] s [Seconds]");
    }
}