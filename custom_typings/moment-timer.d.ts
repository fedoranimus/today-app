// Type definitions for moment-timer 1.1.5
// Project: https://github.com/SeverinDK/moment-timer

import * as moment from 'moment';

declare module "moment" {
    namespace duration {
        const dur: Duration;
    }

    interface Duration {
        timer: Timer
    }

    interface Timer {
        callback: Function;
        start(): void;
        stop(): void;
        isStopped(): boolean;
        getDuration(): number;
        getRemainingDuration(): number;

        //TODO: Add duration
        // timer.duration(2000);
        // timer.duration("2", "seconds");
        // timer.duration({seconds: 2});

        (options: TimerOptions, callback: Function): Timer;
    }

    interface TimerOptions {
        loop?: boolean;
        start?: boolean;
        executeAfterWait?: boolean;
        //TODO: Add wait: moment.duration(1, "hour")
    }
}