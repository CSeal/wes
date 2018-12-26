import { observable, action, computed } from 'mobx';
import { NewUsersAvailability, UsersAvailability } from '../../../../../services/api';
import TypeEnum = UsersAvailability.TypeEnum;
import DayOfWeekEnum = UsersAvailability.DayOfWeekEnum;

export interface ITimeInterval {
    id: number;
    day: string;
    time: number;
    first: boolean;
    active: boolean;
    last: boolean;
    selected: boolean;
}

export interface IIntervals {
    day: string;
    times: ITimeInterval[];
}

export enum days {
    'Sun' = 'SUN',
    'Mon' = 'MON',
    'Tue' = 'TUE',
    'Wed' = 'WED',
    'Thu' = 'THU',
    'Fri' = 'FRI',
    'Sat' = 'SAT',
}

class AvailableStore {
    @observable timeIntervalsArr: IIntervals[] = this.fillTime();
    @observable selectedWeekDay: string = undefined;
    @observable selectedTime: ITimeInterval[] = [];
    @observable startElement: ITimeInterval = undefined;
    @observable start: ITimeInterval[] = [];
    @observable finish: ITimeInterval[] = [];

    fillTime(): IIntervals[] {
        const timeIntervals: IIntervals[] = [];

        Object.keys(days).forEach((el) => {
            const dayInterval: ITimeInterval[] = [];

            for (let i = 0; i < 49; i++) {
                dayInterval.push({
                    id: i,
                    day: el,
                    time: i * 30,
                    active: false,
                    first: false,
                    last: false,
                    selected: false,
                });
            }

            timeIntervals.push({ day: el, times: dayInterval });
        });

        return timeIntervals;
    }

    secToTime(time: number): string {
        const hour: number = Math.floor(time / 60);
        const min: number = time % 60;
        return (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min);
    }

    @action setInitialProps(): void {
        this.selectedWeekDay = undefined;
        this.selectedTime = [];
        this.startElement = undefined;
        this.start = [];
    }

    checkNext(el: ITimeInterval): ITimeInterval {
        const timeIntervals: IIntervals[] = this.timeIntervals;
        let next = null;

        timeIntervals.map((elem: IIntervals) => {
            elem.times.map((element: ITimeInterval) => {
                if (JSON.stringify(el) === JSON.stringify(element)) {
                    if (elem.times[element.id + 1] && elem.times[element.id + 1].active) {
                        next = elem.times[element.id + 1];
                    }
                }
            });
        });

        return next;
    }

    checkPrev(el: ITimeInterval): ITimeInterval {
        const timeIntervals: IIntervals[] = this.timeIntervals;
        let prevEl = null;

        timeIntervals.map((elem: IIntervals) => {
            elem.times.map((element: ITimeInterval) => {
                if (JSON.stringify(el) === JSON.stringify(element)) {
                    if (elem.times[element.id - 1] && elem.times[element.id - 1].active) {
                        prevEl = elem.times[element.id - 1];
                    }
                }
            });
        });

        return prevEl;
    }

    getLast(el: ITimeInterval): number {
        const timeIntervals: IIntervals[] = this.timeIntervals;
        let last = el.time + 30;

        timeIntervals.map((elem: any) => {
            elem.times.map((element: ITimeInterval) => {
                if (JSON.stringify(el) === JSON.stringify(element)) {
                    for (let i = element.id; i < 48; i++) {
                        if (elem.times[i].last) {
                            last = elem.times[i].time + 30;
                            return;
                        }
                    }
                }
            });
        });
        return last;
    }

    getFirst(el: ITimeInterval): number {
        const timeIntervals: IIntervals[] = this.timeIntervals;
        let first = el.time;

        timeIntervals.map((elem: any) => {
            elem.times.map((element: ITimeInterval) => {
                if (JSON.stringify(el) === JSON.stringify(element)) {
                    for (let i = element.id; i >= 0; i--) {
                        elem.times[i].active  = true;
                        if (elem.times[i].first) {
                            first = elem.times[i].time;
                            return;
                        }
                    }
                }
            });
        });
        return first;
    }

    @action setSelectedWeekDay(weekDay: string): void {
        this.selectedWeekDay = weekDay;
    }

    @action setSelectedTime(selectedTime: ITimeInterval[]): void {
        this.selectedTime = selectedTime;
    }

    @action setStartElement(startElement: ITimeInterval): void {
        this.startElement = startElement;
    }

    @action setStart(start: ITimeInterval[]): void {
        this.start = start;
    }

    @computed get timeIntervals(): IIntervals[] {
        return Array.from(this.timeIntervalsArr);
    }

    @computed get availableTime(): NewUsersAvailability[] {
        const availableTime: NewUsersAvailability[] = [];

        this.timeIntervals.map((el: IIntervals) => {
            el.times.map((elem: ITimeInterval) => {
                const tmp: NewUsersAvailability = {
                    date: null,
                    day_of_week: DayOfWeekEnum[days[el.day as keyof typeof days]],
                    type: TypeEnum.DAYOFWEEK,
                    duration: null,
                };
                if (elem.first) {
                    tmp.date = elem.time * 60;
                    tmp.duration = this.getLast(elem) - elem.time;
                    tmp.duration *= 60;
                    availableTime.push(tmp);
                }
            });
        });

        return availableTime;
    }
}

export default new AvailableStore();
