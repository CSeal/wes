import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
import WesDate from '../../components/WesDate';
import { StatisticsStore } from '../../stores/Statistics.store';
import LazyLoad from '../../components/LazyLoad';
import * as classNames from 'classnames';
import Moment from 'react-moment';
import * as moment from 'moment';

// tslint:disable:max-line-length
export interface PartnerStatisticsProps extends GenericProps {
    statisticsStore?: StatisticsStore;
}
@transl()
@inject('statisticsStore')
@observer
export class PartnerStatisticsPage extends React.Component<PartnerStatisticsProps> {
    exportPDF = (e: any): void => {
        e.preventDefault();
        const element = document.getElementById('fullstat');
        const html2pdf = require('html2pdf.js');
        html2pdf(element, {
            margin:       0,
            filename:     'WES_full_statistics_' + moment().format('DDMMYY'),
            image:        { type: 'jpeg', quality: 0.90 },
            html2canvas:  { dpi: 300, letterRendering: false },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' },
        });
    }
    exportXLSX = (e: any): void => {
        e.preventDefault();
        const TableExport = require('tableexport');
        const elementTable = document.getElementById('table-stat');
        const etInstance = TableExport(elementTable, {
            headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
            footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
            formats: ['xlsx'],            // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
            filename: 'WES_full_statistics_' + moment().format('DDMMYY'),                             // (id, String), filename for the downloaded file, (default: 'id')
            bootstrap: true,                           // (Boolean), style buttons using bootstrap, (default: true)
            exportButtons: false,                        // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
            position: 'top',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
            ignoreRows: null,                           // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
            ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
            trimWhitespace: true,                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
        });
        const exportData = etInstance.getExportData()['table-stat'].xlsx;
        etInstance.export2file(exportData.data, exportData.mimeType, exportData.filename, exportData.fileExtension);
    }
    render(): React.ReactNode {
        const {t, statisticsStore} = this.props;
        return (
            <div>
            <div className="col-md-12">
                <header className="heading">
                    <Link to="/partner/" className="back">
                        <svg width="20px" height="14px" viewBox="0 0 20 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <desc>Created with Sketch.</desc>
                            <defs></defs>
                            <g id="WES-Full-Statistics-–-1366px" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-109.000000, -187.000000)">
                                <g id="body" transform="translate(-43.000000, -1.000000)" fill="#888888">
                                    <g id="-g-left-arrow" transform="translate(152.000000, 188.000000)">
                                        <g id="Shape">
                                            <path d="M6.52410322,0.210559595 C6.80605498,-0.0701865318 7.24993848,-0.0701865318 7.53189024,0.210559595 C7.80431659,0.481821056 7.80431659,0.933291179 7.53189024,1.20392033 L2.42183221,6.29212773 L19.2843252,6.29212773 C19.6774066,6.29212773 20,6.60322479 20,6.99462536 C20,7.38602592 19.6774066,7.70723996 19.2843252,7.70723996 L2.42183221,7.70723996 L7.53189024,12.7859627 C7.80431659,13.0667088 7.80431659,13.5188113 7.53189024,13.7894404 C7.24993848,14.0701865 6.80605498,14.0701865 6.52410322,13.7894404 L0.204319768,7.49668037 C-0.0681065892,7.22541891 -0.0681065892,6.77394878 0.204319768,6.50331963 L6.52410322,0.210559595 Z" fillRule="nonzero"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </Link>
                </header>
            </div>
            <div className="col-md-12">
                <div className="block" id="fullstat">
                    <header>
                        <h1>Full statistics of all students as of <WesDate date={Math.floor(new Date().valueOf() / 1000)} /></h1>
                        <ul className="controls">
                            <li>
                                <a href="#" className="btn-icon" onClick={this.exportPDF}>
                                PDF
                                    {/* <span className="icon">
                                        <svg width="20px" height="16px" viewBox="0 0 20 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fillRule="evenodd">
                                                <g id="WES-UI-Style-Guide" transform="translate(-112.000000, -1246.000000)"  fillRule="nonzero">
                                                    <g id="button-icons" transform="translate(102.000000, 1195.000000)">
                                                        <g id="icons" transform="translate(0.000000, 38.000000)">
                                                            <g id="1">
                                                                <g id="right-arrow">
                                                                    <path d="M29.7037553,18.4734657 L21.3666968,13.1051656 C20.9335334,12.8262501 20.359042,13.1348629 20.359042,13.6462916 L20.359042,16.4270161 C15.9810794,17.0813247 12.3169831,20.2119212 11.0778051,24.5238384 L10.0276113,28.1769228 C9.83190847,28.8577579 10.72554,29.2997768 11.1641722,28.7566786 C13.7960825,25.4976642 15.6269393,22.452873 20.359042,21.8204894 L20.359042,24.3828533 C20.359042,24.8944367 20.9336505,25.2028174 21.3666968,24.9239793 L29.7037162,19.5556792 C30.0986766,19.3014342 30.0988329,18.727788 29.7037553,18.4734657 Z M21.6632589,23.1928708 L21.6632589,21.1076755 C21.6632589,20.7347184 21.3445093,20.4392916 20.9689239,20.463498 C17.7669753,20.6693301 14.7810811,22.2106539 12.7767871,24.6922394 L12.1690536,25.4448432 C13.5671766,20.5812434 17.0887341,18.0287787 21.075291,17.6391556 C21.4090014,17.6065194 21.6632979,17.3286867 21.6632979,16.9967955 L21.6632979,14.8362354 L28.1523512,19.0145918 L21.6632589,23.1928708 Z" id="Shape"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </span> */}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="btn-icon" onClick={this.exportXLSX}>
                                    <span className="icon">
                                        <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <defs></defs>
                                            <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fillRule="evenodd">
                                                <g id="WES-UI-Style-Guide" transform="translate(-112.000000, -1326.000000)"  fillRule="nonzero" stroke="#32D1FF" strokeWidth="0.3">
                                                    <g id="button-icons" transform="translate(102.000000, 1195.000000)">
                                                        <g id="icons" transform="translate(0.000000, 38.000000)">
                                                            <g id="2" transform="translate(0.000000, 83.000000)">
                                                                <g id="download">
                                                                    <path d="M19.996633,11 C19.7676768,11 19.5858586,11.1862949 19.5858586,11.4166232 L19.5858586,22.5841584 L17.7037037,20.6907243 C17.5420875,20.5281397 17.2828283,20.5281397 17.1212121,20.6907243 C16.959596,20.853309 16.959596,21.1141219 17.1212121,21.2767066 L19.7070707,23.8780615 C19.7878788,23.9593538 19.8922559,24 20,24 C20.1043771,24 20.2121212,23.9593538 20.2929293,23.8780615 L22.8787879,21.2767066 C23.040404,21.1141219 23.040404,20.853309 22.8787879,20.6907243 C22.7171717,20.5281397 22.4579125,20.5281397 22.2962963,20.6907243 L20.4141414,22.5841584 L20.4141414,11.4166232 C20.4107744,11.1862949 20.2255892,11 19.996633,11 Z" id="Shape"></path>
                                                                    <path d="M27.5713407,27 L11.4286593,27 C11.1916769,27 11,27.2235772 11,27.5 C11,27.7764228 11.1916769,28 11.4286593,28 L27.5713407,28 C27.8083231,28 28,27.7764228 28,27.5 C28,27.2235772 27.8083231,27 27.5713407,27 Z" id="Shape"></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </header>
                    <div className="table-responsive">
                    <LazyLoad $={statisticsStore.statisticsPartnerUsers$.current()}>
                        { () =>
                        <table className="table table-striped" id="table-stat">
                            <thead>
                                <tr>
                                    <th>{t('Name')}</th>
                                    <th>{t('Package')}</th>
                                    <th>{t('Package')} <br />{t('Duration')}</th>
                                    <th>{t('Grammar')}</th>
                                    <th>{t('Writing')}</th>
                                    <th>{t('Speaking')}</th>
                                    <th>{t('Pronunciation')}</th>
                                    <th>{t('Listening')}</th>
                                    <th>{t('Holistic Score')}</th>
                                    <th>{t('Lessons Left')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                { statisticsStore.statisticsPartnerUsers$.current().map((statistic) =>
                                    <tr key={statistic.id}>
                                        <td>{statistic.student_name}</td>
                                        <td>{statistic.package_name}</td>
                                        <td><WesDate date={statistic.start_package} /><br /><WesDate date={statistic.ends_package} /></td>
                                        <td>{statistic.grammar_score} <span className={classNames('glyphicon', {'glyphicon-arrow-down': statistic.grammar_score_raised < 0}, {'glyphicon-arrow-up': statistic.grammar_score_raised > 0})}></span></td>
                                        <td>{statistic.writing_score} <span className={classNames('glyphicon', {'glyphicon-arrow-down': statistic.writing_score_raised < 0}, {'glyphicon-arrow-up': statistic.writing_score_raised > 0})}></span></td>
                                        <td>{statistic.speaking_score} <span className={classNames('glyphicon', {'glyphicon-arrow-down': statistic.speaking_score_raised < 0}, {'glyphicon-arrow-up': statistic.speaking_score_raised > 0})}></span></td>
                                        <td>{statistic.listening_score} <span className={classNames('glyphicon', {'glyphicon-arrow-down': statistic.listening_score_raised < 0}, {'glyphicon-arrow-up': statistic.listening_score_raised > 0})}></span></td>
                                        <td>{statistic.holistic_score}</td>
                                        <td>{statistic.lessons_left}</td>
                                    </tr>,
                                    )
                                }
                            </tbody>
                        </table>
                        }
                        </LazyLoad>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
