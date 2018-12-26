import * as React from 'react';
import { GenericProps } from '../../../interfaces/GenericProps.interface';
import transl from '../../../utils/t.decorator';
import ModalLayout from '../../../layout/modal';

export interface DeleteCompletedProps extends GenericProps {
    cancel: () => void;
    user: string;
}
@transl()
export default class DeleteCompleted extends React.Component<DeleteCompletedProps, any> {
    render() {
        const { t } = this.props;
        return (
            <ModalLayout>
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={() => this.props.cancel()}><span aria-hidden="true">&times;</span></button>
                        <div className="image">
                            <svg width="80px" height="43px" viewBox="0 0 80 43" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                    <g id="WES-Students-Delete-Successful-–-1366px" transform="translate(-645.000000, -307.000000)" fillRule="nonzero">
                                        <g id="popup-copy-2" transform="translate(402.000000, 243.000000)">
                                            <g id="-g-garlands" transform="translate(243.000000, 64.000000)">
                                                <rect id="Rectangle-path" fill="#00E8F2" x="21" y="5" width="5" height="5"></rect>
                                                <rect id="Rectangle-path" fill="#FF9A00" x="39" y="13" width="5" height="5"></rect>
                                                <rect id="Rectangle-path" fill="#006EF5" x="54" y="0" width="5" height="5"></rect>
                                                <polygon id="Shape" fill="#FD715E" points="47 24 47 43 38.6267411 38.5276942 38.6205586 38.530689 30 42.9101556 30 24"></polygon>
                                                <polygon id="Shape" fill="#FFAE50" points="20.8605546 22.3933025 20.8605546 22.3931515 9.44946084 17.8515661 9.44946084 17.8515661 7.31001546 17 0 34.6720738 9.65667776 33.7453028 15.6558076 41 23 23.2448687"></polygon>
                                                <polygon id="Shape" fill="#293EAD" points="71.6899845 17 69.5505392 17.8515661 69.5505392 17.8515661 58.1394454 22.3931515 58.1394454 22.3931515 56 23.2448687 63.3441924 41 69.3433222 33.7453028 79 34.6720738"></polygon>
                                                <polygon id="Shape" fill="#FD715E" points="49 24 49 43 40.0066404 38.5276942 40 38.530689 40 24"></polygon>
                                                <path d="M79,9 L79,15.4673347 C73.2662958,20.2163401 61.7512042,25.979188 39.6203652,26 L39.5,26 C17.2904606,26 5.74450621,20.2252595 0,15.4673347 L0,9 C1.01832043,10.3288474 2.97950158,12.4082653 6.42333507,14.4789125 C11.777426,17.7015049 21.8623321,21.5408764 39.5,21.5408764 L39.6203652,21.5408764 C57.1839622,21.5230375 67.2349192,17.6940721 72.5766649,14.4789125 C76.0189553,12.408414 77.9816796,10.3288474 79,9 Z" id="Shape" fill="#32D1FF"></path>
                                                <path d="M80,9 L80,15.4673347 C74.1759702,20.2163401 62.4794762,25.979188 40,26 L40,21.5407277 C57.8402843,21.5228888 68.0495786,17.6939234 73.4754752,14.4787639 C76.9719935,12.408414 78.9656375,10.3288474 80,9 Z" id="Shape" fill="#32D1FF"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        {t('Admin')} <strong>{this.props.user}</strong> {t('has been deleted successfully')}.
                    </div>
                    <div className="modal-body">
                        <form action="#">
                            <fieldset>
                                <div className="form-action">
                                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => this.props.cancel()}>{t('OK')}</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </ModalLayout>
        );
    }
}
