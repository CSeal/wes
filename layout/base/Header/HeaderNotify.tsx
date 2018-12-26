import * as React from 'react';
import { Link } from 'react-router-dom';
import transl from '../../../utils/t.decorator';
import { inject, observer } from 'mobx-react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import * as classNames from 'classnames';
import { Notification } from '../../../services/api';
import { ChatStore } from '../../../stores/Chat.store';

interface HeaderNotifyProps extends GenericProps {
  chatStore?: ChatStore;
}
@transl()
@inject('notificationStore')
@inject('chatStore')
@observer
export default class HeaderNotify extends React.Component<HeaderNotifyProps, any> {
  render() {
    const { t, notificationStore, chatStore } = this.props;
    return (
      <div className="notify">
      <Link to="/chat/" className={classNames('btn-icon-dark', {'has-notify': chatStore.unreadFlag})}>
        <span className="icon">
          <svg width="24px" height="17px" viewBox="0 0 24 17" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1"  fillRule="evenodd">
              <g id="WES-UI-Style-Guide" transform="translate(-110.000000, -1414.000000)" fillRule="nonzero">
                <g id="button-icons" transform="translate(102.000000, 1195.000000)">
                  <g id="icons-copy-2" transform="translate(0.000000, 206.000000)">
                    <g id="1">
                      <g id="chat" transform="translate(8.000000, 13.000000)">
                        <path d="M7.76173996,0.714285714 C6.66880504,0.714285714 5.77777778,1.51843049 5.77777778,2.50479526 L5.77777778,9.62722042 C5.77777778,10.6135852 6.66880504,11.41773 7.76173996,11.41773 L16.6544554,11.41773 L19.1607439,14.0361521 C19.3143693,14.1946043 19.5294449,14.2857143 19.7620776,14.2857143 C20.2010073,14.2857143 20.5609296,13.9648486 20.5609296,13.5687182 L20.5609296,11.4216913 L21.1271489,11.4216913 C22.2200838,11.4216913 23.1111111,10.6175465 23.1111111,9.63118172 L23.1111111,2.50479526 C23.1111111,1.51843049 22.2200838,0.714285714 21.1271489,0.714285714 L7.76173996,0.714285714 Z M22.0313441,2.50479526 L22.0313441,9.62722042 C22.0313441,10.0788091 21.6231395,10.4472104 21.1227596,10.4472104 L20.0210461,10.4472104 C19.7225739,10.4472104 19.4811626,10.6650821 19.4811626,10.9344508 L19.4811626,12.8873739 L17.3040714,10.6175465 C17.2031175,10.5105913 17.0538814,10.4511717 16.8958667,10.4511717 L7.76173996,10.4511717 C7.26136012,10.4511717 6.85315551,10.0827704 6.85315551,9.63118172 L6.85315551,2.50479526 C6.85315551,2.05320657 7.26136012,1.68480527 7.76173996,1.68480527 L21.1227596,1.68480527 C21.6231395,1.68480527 22.0313441,2.05320657 22.0313441,2.50479526 Z" id="Shape"></path>
                        <path d="M3.58779982,16.9524643 C3.6955878,16.9841548 3.80850854,17 3.91629652,17 C4.17806732,17 4.43470536,16.9128513 4.61435199,16.7504378 L7.54515842,14.1320157 L16.7020038,14.1320157 C17.0510315,14.1320157 17.3333333,13.9141439 17.3333333,13.6447752 C17.3333333,13.3754066 17.0510315,13.1575348 16.7020038,13.1575348 L7.25772382,13.1575348 C7.07294443,13.1575348 6.90356332,13.2169544 6.78037706,13.3239096 L4.23966045,15.6016596 L4.23966045,13.6487366 C4.23966045,13.3793679 3.9573586,13.1614961 3.60833087,13.1614961 L2.3200079,13.1614961 C1.73487316,13.1614961 1.2575264,12.7930948 1.2575264,12.3415061 L1.2575264,5.21908098 C1.2575264,4.76749229 1.73487316,4.39909098 2.3200079,4.39909098 C2.66903563,4.39909098 2.95133748,4.18121925 2.95133748,3.91185055 C2.95133748,3.64248186 2.66903563,3.42857143 2.3200079,3.42857143 C1.04195045,3.42857143 0,4.2327162 0,5.21908098 L0,12.3415061 C0,13.3278709 1.04195045,14.1320157 2.3200079,14.1320157 L2.98213404,14.1320157 L2.98213404,16.2790426 C2.98213404,16.584063 3.21824104,16.8494704 3.58779982,16.9524643 Z" id="Shape"></path>
                        <ellipse id="Oval" cx="15.1666667" cy="6.82142857" rx="1" ry="1"></ellipse>
                        <ellipse id="Oval" cx="13.7222222" cy="6.82142857" rx="1" ry="1"></ellipse>
                        <ellipse id="Oval" cx="15.1666667" cy="6.82142857" rx="1" ry="1"></ellipse>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </Link>
      <Link to="/notifications/" className={classNames('btn-icon-dark', {'has-notify': notificationStore.unreadFlag})}>
        <span className="icon">
          <svg width="19px" height="19px" viewBox="0 0 19 19" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fillRule="evenodd">
              <g id="WES-UI-Style-Guide" transform="translate(-112.000000, -1498.000000)" fillRule="nonzero">
                <g id="button-icons" transform="translate(102.000000, 1195.000000)">
                  <g id="icons-copy-3" transform="translate(0.000000, 292.000000)">
                    <g id="1">
                      <g id="notify" transform="translate(10.000000, 11.000000)">
                        <path d="M18.1392694,15.229179 C16.2334475,13.2801733 15.1826484,10.7588108 15.1826484,8.11025792 C15.1826484,5.6225635 13.4006849,3.52018114 10.9714612,2.85056113 C11.1752283,2.55877141 11.2950913,2.21460918 11.2950913,1.84051979 C11.2950913,0.826737547 10.4121005,0 9.3293379,0 C8.24657534,0 7.36358447,0.826737547 7.36358447,1.84051979 C7.36358447,2.21460918 7.48344749,2.55877141 7.68721461,2.85056113 C5.26997717,3.51644024 3.49200913,5.60011813 3.4760274,8.07284899 C3.4760274,8.08407167 3.4760274,8.09529435 3.4760274,8.10651703 C3.4760274,10.751329 2.42922374,13.2652097 0.519406393,15.2254381 C0.227739726,15.2478834 0,15.4723371 0,15.7491632 C0,16.0409529 0.251712329,16.2766293 0.563356164,16.2766293 L5.90924658,16.2766293 C6.18093607,17.8178775 7.60730594,19 9.33333333,19 C11.0553653,19 12.4857306,17.8178775 12.7574201,16.2766293 L18.1033105,16.2766293 C18.4149543,16.2766293 18.6666667,16.0409529 18.6666667,15.7491632 C18.6626712,15.476078 18.4309361,15.2478834 18.1392694,15.229179 Z M9.3293379,1.05493207 C9.79280822,1.05493207 10.168379,1.4065761 10.168379,1.84051979 C10.168379,2.27446348 9.79280822,2.6261075 9.3293379,2.6261075 C8.86586758,2.6261075 8.4902968,2.27446348 8.4902968,1.84051979 C8.4902968,1.4065761 8.86586758,1.05493207 9.3293379,1.05493207 Z M9.3293379,17.9488088 C8.23059361,17.9488088 7.3076484,17.238039 7.05593607,16.2803702 L11.6027397,16.2803702 C11.3510274,17.238039 10.4280822,17.9488088 9.3293379,17.9488088 Z M1.99771689,15.2254381 C3.67579909,13.2053554 4.59075342,10.7326245 4.59874429,8.14392597 C4.59874429,8.13270329 4.59874429,8.12148061 4.59874429,8.11025792 C4.59874429,5.67119512 6.72031963,3.68478047 9.32534247,3.68478047 C11.9303653,3.68478047 14.0519406,5.67119512 14.0519406,8.11025792 C14.0519406,10.7101792 14.966895,13.1978736 16.652968,15.2254381 L1.99771689,15.2254381 Z" id="Shape"></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </Link>
    </div>
    );
  }
}