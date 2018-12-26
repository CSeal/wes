import * as React from 'react';
import * as classnames from 'classnames';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import AvailabilityStore, { ITimeInterval } from '../store/availability.store';

interface TeacherAvailabilityTimeBlockProps {
    element: ITimeInterval;
}

@observer
export default class TeacherAvailabilityTimeBlock extends React.Component<TeacherAvailabilityTimeBlockProps> {
    render(): React.ReactNode {
        const { element } = this.props;

        const className: string = classnames({
            'first-half': element.id % 2 !== 0,
            'second-half': element.id % 2 === 0,
            'available': element.active,
            'start': element.first,
            'finish': element.last,
            'selected' : element.selected,
        });

        return (
            <div
                style={{ borderBottom: element.id % 2 !== 0 ? '1px solid #E9E8E8' : '1px dashed #E9E8E8' }}
                className={className}
                onMouseDown={() => { this.onMouseDown(element); }}
                onMouseUp={() => { this.onMouseUp(element); }}
                onMouseEnter={() => { this.onMouseEnter(element); }}
                onClick={() => { this.onClick(element); }}
                onMouseLeave={() => { this.onMouseLeave(element); }}
            >
                {!element.selected && (
                    <span>{element.first ? `${AvailabilityStore.secToTime(element.time)}-${AvailabilityStore.secToTime(AvailabilityStore.getLast(element))}` : ''}</span>
                )}
                {element.selected && (
                    <span>{AvailabilityStore.secToTime(element.time) + '-' + AvailabilityStore.secToTime(element.time + 30)}</span>
                )}
            </div>
        );
    }

    onMouseDown(el: ITimeInterval): void {
        const timeRange: ITimeInterval[] = AvailabilityStore.selectedTime.slice();
        const startEl: ITimeInterval[] = AvailabilityStore.start.slice();

        if (AvailabilityStore.startElement === undefined) {
            startEl.push(el);
            el.active = true;

            if (AvailabilityStore.checkPrev(el)) {
                AvailabilityStore.checkPrev(el).last = false;
            } else {
                el.first = true;
            }

            if (timeRange.indexOf(el) === -1) {
                timeRange.push(el);
            }
        }

        AvailabilityStore.setSelectedWeekDay(el.day);
        AvailabilityStore.setSelectedTime(timeRange);
        AvailabilityStore.setStartElement(el);
        AvailabilityStore.setStart(startEl);
    }

    onMouseUp(el: ITimeInterval): void {
        const timeRange: ITimeInterval[] = AvailabilityStore.selectedTime.slice();

        if (AvailabilityStore.checkNext(el)) {
            AvailabilityStore.checkNext(el).first = false;
        } else {
            el.last = true;
        }

        AvailabilityStore.setSelectedTime(timeRange);
        AvailabilityStore.setStartElement(undefined);
    }

    onMouseEnter(el: ITimeInterval): void {
        if (AvailabilityStore.selectedWeekDay !== el.day || AvailabilityStore.startElement && AvailabilityStore.startElement.time > el.time) {
            AvailabilityStore.setInitialProps();
            return;
        }

        const timeRange: ITimeInterval[] = AvailabilityStore.selectedTime.slice();

        if (AvailabilityStore.startElement && timeRange.indexOf(el) === -1) {
            timeRange.push(el);
            el.active = true;
        }

        if (el.active && !AvailabilityStore.startElement) {
            el.selected = true;
        }

        if (AvailabilityStore.startElement) {
            el.first = false;
            el.last = false;
        }

        AvailabilityStore.setSelectedTime(timeRange);
    }

    onMouseLeave(el: ITimeInterval): void {
        if (el.selected) {
            el.selected = false;
            AvailabilityStore.setInitialProps();
        }
    }

    @action onClick(el: ITimeInterval): void {
        const times: ITimeInterval[] = AvailabilityStore.selectedTime.slice();
        const exist: number = times.indexOf(el);

        if (exist > -1) {
            el.last = false;
            el.first = false;
            el.active = false;
            el.selected = false;

            if (AvailabilityStore.checkPrev(el)) {
                AvailabilityStore.checkPrev(el).last = true;
            }

            if (AvailabilityStore.checkNext(el)) {
                AvailabilityStore.checkNext(el).first = true;
            }

            times.splice(exist, 1);
            AvailabilityStore.setSelectedTime(times);
        }
    }
}
