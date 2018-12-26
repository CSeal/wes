import * as React from 'react';
import moment = require('moment');
import {GenericProps} from '../../../interfaces/GenericProps.interface';
import {unitOfTime} from 'moment';

interface DateRangeProps extends GenericProps {
    onDateChange: (start: string, end: string) => void;
    date?: string;
}
interface DateRangeState {
    startDate: string;
    endDate: string;
}

export default class DateRangeComponent extends React.Component<DateRangeProps, DateRangeState> {
    constructor(props: DateRangeProps) {
        super(props);
        this.state = {
            startDate: moment(this.props.date).startOf('isoweek' as unitOfTime.StartOf).format('LL'),
            endDate: moment(this.props.date).endOf('isoweek' as unitOfTime.StartOf).format('LL'),
        };
        props.onDateChange(this.state.startDate, this.state.endDate);
    }
    nextWeek(): void {
        const start = moment(this.state.startDate).add(7, 'days').format('LL');
        const end = moment(this.state.endDate).add(7, 'days').format('LL');
        this.setState({
            startDate: start,
            endDate: end,
        });
        this.props.onDateChange(start, end);
    }
    prevWeek(): void {
        const start = moment(this.state.startDate).subtract(7, 'days').format('LL');
        const end = moment(this.state.endDate).subtract(7, 'days').format('LL');
        this.setState({
            startDate: start,
            endDate: end,
        });
        this.props.onDateChange(start, end);
    }
    render() {
        return(
            <div className="selecter-dates">
                <a onClick={() => this.prevWeek()} className="prev-date">
                    <svg width="5px" height="9px" viewBox="0 0 5 9" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="WES-Packages-Group-Step-2-–-no-dates-–-1366px" transform="translate(-534.000000, -1020.000000)" fill="#555555" fillRule="nonzero">
                                <g id="popup-copy" transform="translate(302.000000, 67.000000)">
                                    <g id="form" transform="translate(98.000000, 203.000000)">
                                        <g id="no-dates" transform="translate(2.000000, 691.000000)">
                                            <g id="date">
                                                <g id="calendar-copy-2" transform="translate(0.000000, 22.000000)">
                                                    <g id="date-copy" transform="translate(132.000000, 34.000000)">
                                                        <g id="left" transform="translate(2.500000, 7.500000) scale(-1, 1) translate(-2.500000, -7.500000) translate(0.000000, 3.000000)">
                                                            <path d="M6.90791402,2.09661836 C6.78386996,1.96779388 6.58229837,1.96779388 6.45825431,2.09661836 L2.50434991,6.21095008 L-1.45730724,2.09661836 C-1.5813513,1.96779388 -1.7829229,1.96779388 -1.90696696,2.09661836 C-2.03101101,2.22544283 -2.03101101,2.43478261 -1.90696696,2.56360709 L2.2717673,6.90338164 C2.33378933,6.96779388 2.41131687,7 2.49659716,7 C2.57412469,7 2.65940498,6.96779388 2.72142701,6.90338164 L6.90016127,2.56360709 C7.03195808,2.43478261 7.03195808,2.22544283 6.90791402,2.09661836 Z" id="Shape" transform="translate(2.500000, 4.500000) rotate(-90.000000) translate(-2.500000, -4.500000) "></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
                <span>{this.state.startDate} – {this.state.endDate}</span>
                <a onClick={() => this.nextWeek()} className="next-date">

                    <svg width="5px" height="9px" viewBox="0 0 5 9" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="WES-Packages-Group-Step-2-–-no-dates-–-1366px" transform="translate(-807.000000, -1019.000000)" fill="#555555" fillRule="nonzero">
                                <g id="popup-copy" transform="translate(302.000000, 67.000000)">
                                    <g id="form" transform="translate(98.000000, 203.000000)">
                                        <g id="no-dates" transform="translate(2.000000, 691.000000)">
                                            <g id="date">
                                                <g id="calendar-copy-2" transform="translate(0.000000, 22.000000)">
                                                    <g id="date-copy" transform="translate(132.000000, 34.000000)">
                                                        <g id="right" transform="translate(273.000000, 2.000000)">
                                                            <path d="M6.90791402,2.09661836 C6.78386996,1.96779388 6.58229837,1.96779388 6.45825431,2.09661836 L2.50434991,6.21095008 L-1.45730724,2.09661836 C-1.5813513,1.96779388 -1.7829229,1.96779388 -1.90696696,2.09661836 C-2.03101101,2.22544283 -2.03101101,2.43478261 -1.90696696,2.56360709 L2.2717673,6.90338164 C2.33378933,6.96779388 2.41131687,7 2.49659716,7 C2.57412469,7 2.65940498,6.96779388 2.72142701,6.90338164 L6.90016127,2.56360709 C7.03195808,2.43478261 7.03195808,2.22544283 6.90791402,2.09661836 Z" id="Shape" transform="translate(2.500000, 4.500000) rotate(-90.000000) translate(-2.500000, -4.500000) "></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </a>
            </div>
        );
    }
}
