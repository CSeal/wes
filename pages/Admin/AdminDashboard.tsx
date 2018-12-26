import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route } from 'react-router';
import { LessonExtended } from '../../stores/Lesson.store';
import LazyLoad from '../../components/LazyLoad';
import Moment from 'react-moment';
import WesDate from '../../components/WesDate';
import { StatisticCountersMonth, StatisticOwed, UserOwed } from '../../services/api';

export interface AdminDashboardProps extends GenericProps {
}
export interface AdminDashboardState {
}

interface IStatisticsListItem {
    linkTitle: string;
    titleValue: React.ReactText;
    linkHref: string;
}

@transl()
@inject('userStore')
@inject('lessonStore')
@inject('statisticsStore')
@observer
export class AdminDashboardPage extends React.Component<AdminDashboardProps, AdminDashboardState> {
    render(): React.ReactNode {
        const { t, userStore, lessonStore, statisticsStore } = this.props;
        const statistics: StatisticCountersMonth = statisticsStore.statisticsCountersMonth$.current();
        const lessons: LessonExtended[] = lessonStore.lessonsList$.current();
        const owed: StatisticOwed = statisticsStore.statisticsOwed$.current();

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1>{t('My Dashboard')}</h1>
                    </div>
                    <div className="statistics">
                        <div className="col-md-8">
                            <header>
                                <h2>{t('Upcoming Lessons')}</h2>
                            </header>
                            <div className="block">
                                <div className="table-responsive no-padding">
                                    <LazyLoad $={lessons}>
                                        {() => this.renderLessonsList(lessons)}
                                    </LazyLoad>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <header>
                                <h2>{t('Statistics')}</h2>
                            </header>
                            <LazyLoad $={statistics}>
                                {() => this.renderStatisticsList(statistics)}
                            </LazyLoad>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <header>
                            <h2>{t('Owed by Partners')}</h2>
                        </header>
                        <div className="block">
                            <LazyLoad $={owed}>
                                {() => this.renderPaymentTable(owed.partners)}
                            </LazyLoad>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <header>
                            <h2>{t('Owed to Teachers')}</h2>
                        </header>
                        <div className="block">
                            <LazyLoad $={owed}>
                                {() => this.renderPaymentTable(owed.teachers)}
                            </LazyLoad>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderPaymentTable(owedArr: UserOwed[]): React.ReactNode {
        let total: number = 0;
        return (
            <table className="payment-table">
                <tbody>
                    {owedArr.map(({ owed, name, id }) => {
                        const { amount, currency } = owed;
                        total += amount;
                        return (
                            <tr key={id}>
                                <td>{name}</td>
                                <td>{currency}{amount}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <th>Total:</th>
                        <th>${total}</th>
                    </tr>
                </tfoot>
            </table>
        );
    }

    renderLessonsList(lessons: LessonExtended[]): React.ReactNode {
        const { t } = this.props;
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>{t('Name of Package')}</th>
                        {/* <th>{t('Number of Lesson')}</th> */}
                        <th>{t('Type of Package')}</th>
                        <th>{t('Date')}</th>
                        <th>{t('Time')}</th>
                        <th>{t('Students')}</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons.map((lesson) => (
                        <tr key={lesson.date}>
                            <td><strong>{lesson.package.name}</strong></td>
                            <td>{lesson.package.type}</td>
                            <td><WesDate date={lesson.date} /></td>
                            <td><Moment format="ha" date={lesson.date} /> - <Moment format="ha" date={lesson.date + lesson.duration * 1000} /></td>
                            <td>{lesson.students.map((student) => <div key={student.id}>{student.name}</div>)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    renderStatisticsList(statistics: StatisticCountersMonth): React.ReactNode {
        const { all_lessons, average_lessons, lessons_count, price_per_lesson, profit_per_lesson } = statistics;
        return (
            <ul className="statistics-control">
                {this.renderStatisticsListItem({ linkTitle: 'Lessons this month', titleValue: lessons_count, linkHref: '#' })}
                {this.renderStatisticsListItem({ linkTitle: 'Lessons monthly average', titleValue: average_lessons, linkHref: '#' })}
                {this.renderStatisticsListItem({ linkTitle: 'Lessons all', titleValue: all_lessons, linkHref: '#' })}
                {this.renderStatisticsListItem({ linkTitle: 'Profit per lesson', titleValue: `$${profit_per_lesson}`, linkHref: '#' })}
                {this.renderStatisticsListItem({ linkTitle: 'Price per lesson', titleValue: `$${price_per_lesson}`, linkHref: '#' })}
            </ul>
        );
    }

    renderStatisticsListItem({ linkTitle, titleValue, linkHref }: IStatisticsListItem): React.ReactNode {
        const { t } = this.props;
        return (
            <li>
                <a href={linkHref}>
                    {t(linkTitle)} <span>{titleValue}</span>
                </a>
            </li>
        );
    }
}
