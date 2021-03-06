import * as React from 'react';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import { observer, inject } from 'mobx-react';
import transl from '../../utils/t.decorator';
import StudentsComponent from '../components/Students.component';
import LazyLoad from '../../components/LazyLoad';
import { Link } from 'react-router-dom';
import { EvaluationsChartComponent } from '../components/EvaluationsChart.component';

export interface PartnerDashboardProps extends GenericProps {
}
export interface PartnerDashboardState {
}
// tslint:disable:max-line-length

@transl()
@inject('userStore')
@inject('statisticsStore')
@observer
export class PartnerDashboardPage extends React.Component<PartnerDashboardProps, PartnerDashboardState> {
    render(): React.ReactNode {
        const {t, userStore, statisticsStore} = this.props;
        const statistics = statisticsStore.statisticsPartner$.current();
        return (
          <div className="row">
            <div className="col-md-12">
              <h1>{t('My Dashboard')}</h1>
            </div>
            <div className="statistics">
              <div className="col-md-8">
                <header>
                  <h2>{t('Students Progress')}</h2>
                  <Link to="/partner/statistics" className="btn btn-primary">
                    <svg width="16px" height="8px" viewBox="0 0 16 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <defs></defs>
                      <g id="WES-Dashboard-Dark-Overall-Progress-–-1366px" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" transform="translate(-697.000000, -255.000000)">
                        <g id="students-progress-copy" transform="translate(109.000000, 239.000000)" fill="#32D1FF" fillRule="nonzero">
                          <g id="view-full-stat" transform="translate(565.000000, 0.000000)">
                            <g id="line-chart" transform="translate(23.000000, 16.000000)">
                              <path d="M14.3011283,3.29706561e-05 C13.3643801,3.29706561e-05 12.6022879,0.804088361 12.6022879,1.79241675 C12.6022879,2.15288493 12.7040064,2.48855918 12.8782561,2.76989779 L11.0428534,4.70636334 C10.7761665,4.52251896 10.4580108,4.41519947 10.1163552,4.41519947 C9.76232468,4.41519947 9.43329408,4.53020112 9.16085711,4.72647544 L7.30654823,2.76976591 C7.48076664,2.4884273 7.58242269,2.15278602 7.58242269,1.79238378 C7.58242269,0.804055391 6.82033043,0 5.88358226,0 C4.94683409,0 4.18474183,0.804055391 4.18474183,1.79238378 C4.18474183,2.15278602 4.28642913,2.48832839 4.46058504,2.769667 L2.62511987,4.70623145 C2.35849539,4.52245302 2.04040226,4.41519947 1.69884043,4.41519947 C0.762092262,4.41519947 0,5.21928783 0,6.20761622 C0,7.19594461 0.762092262,8 1.69884043,8 C2.6355886,8 3.39768086,7.19594461 3.39768086,6.20761622 C3.39768086,5.84714804 3.29596231,5.51147379 3.12171265,5.23010221 L4.95711532,3.29363666 C5.2238023,3.47748104 5.54195793,3.58480053 5.88361351,3.58480053 C6.22523784,3.58480053 6.54339347,3.47748104 6.8100492,3.29363666 L8.67460806,5.2611276 C8.51192088,5.53603693 8.41754606,5.8603363 8.41754606,6.20758325 C8.41754606,7.19591164 9.17963832,7.99996703 10.1163865,7.99996703 C11.0531347,7.99996703 11.8152269,7.19591164 11.8152269,6.20758325 C11.8152269,5.84718101 11.7135396,5.51160567 11.5393837,5.23030003 L13.3748801,3.29373558 C13.6415359,3.47751401 13.959629,3.58476756 14.3011596,3.58476756 C15.2379077,3.58476756 16,2.78071217 16,1.79238378 C16,0.80402242 15.2378765,3.29706561e-05 14.3011283,3.29706561e-05 Z M1.69884043,7.25911639 C1.14927901,7.25911639 0.702186129,6.78740521 0.702186129,6.20761622 C0.702186129,5.62779426 1.14927901,5.15608309 1.69884043,5.15608309 C2.24837061,5.15608309 2.69549474,5.62779426 2.69549474,6.20761622 C2.69549474,6.78740521 2.24840186,7.25911639 1.69884043,7.25911639 Z M5.88361351,2.84391691 C5.33408333,2.84391691 4.88695921,2.37220574 4.88695921,1.79238378 C4.88695921,1.21259479 5.33405208,0.740850643 5.88361351,0.740850643 C6.43317494,0.740850643 6.88026781,1.21256182 6.88026781,1.79238378 C6.88026781,2.37220574 6.43317494,2.84391691 5.88361351,2.84391691 Z M10.1163552,7.25911639 C9.56682506,7.25911639 9.11970094,6.78740521 9.11970094,6.20758325 C9.11970094,5.62776129 9.56679381,5.15605012 10.1163552,5.15605012 C10.6658854,5.15605012 11.1130095,5.62776129 11.1130095,6.20758325 C11.1129783,6.78740521 10.6658854,7.25911639 10.1163552,7.25911639 Z M14.3011283,2.84391691 C13.7515981,2.84391691 13.304474,2.37220574 13.304474,1.79238378 C13.304474,1.21259479 13.7515669,0.740850643 14.3011283,0.740850643 C14.8506585,0.740850643 15.2977826,1.21256182 15.2977826,1.79238378 C15.2977826,2.37220574 14.8506585,2.84391691 14.3011283,2.84391691 Z" id="-g-Shape"></path>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    {t('View full statistics')}</Link>
                </header>
                <div className="block">
                  <div className="graph">
                    {/* <img src="/images/graph_01.png" width="100%" height="auto" alt="" /> */}
                    <EvaluationsChartComponent evaluations={this.props.statisticsStore.statisticsEvaluations$.current()} />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <header>
                  <h2>{t('Statistics')}</h2>
                </header>
                <LazyLoad $={statistics}>
                { () =>
                  <ul className="statistics-control">
                    <li>
                      <a href="#">
                        {t('Lessons this month')} <span>{statistics.month_lessons}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {t('Lessons monthly average')} <span>{statistics.average_lessons}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {t('Lessons all')} <span>{statistics.all_lessons}</span>
                      </a>
                    </li>
                  </ul>
                }
                </LazyLoad>
              </div>
            </div>
              <StudentsComponent />
          </div>
        );
    }
}
