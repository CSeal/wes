import * as React from 'react';

interface MoreButtonProps {
}
interface MoreButtonState {
}

export class MoreButtonSVG extends React.PureComponent<MoreButtonProps, MoreButtonState> {
    render(): React.ReactNode {
        return (
            <svg width="4px" height="15px" viewBox="0 0 4 15" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <g id="Boostrap3-grid-system-layouts" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="WES-Admins-Profiles-–-Admin-–-1366px" transform="translate(-1245.000000, -174.000000)" fill="#555555" fillRule="nonzero">
                        <g id="body" transform="translate(-503.000000, -241.000000)">
                            <g id="bio" transform="translate(1002.000000, 414.000000)">
                                <g id="more" transform="translate(601.000000, 1.000000)">
                                    <g id="-g-more" transform="translate(145.000000, 0.000000)">
                                        <path
                                            d="M2,4 C3.10275,4 4,3.10275 4,2 C4,0.89725 3.10275,0 2,0 C0.89725,0 0,0.89725 0,2 C0,3.10275 0.89725,4 2,4 Z"
                                            id="Shape"
                                        />
                                        <path
                                            d="M2,11 C0.89725,11 0,11.89725 0,13 C0,14.10275 0.89725,15 2,15 C3.10275,15 4,14.10275 4,13 C4,11.89725 3.10275,11 2,11 Z"
                                            id="Shape"
                                        />
                                        <path
                                            d="M2,5 C0.89725,5 0,5.89725 0,7 C0,8.10275 0.89725,9 2,9 C3.10275,9 4,8.10275 4,7 C4,5.89725 3.10275,5 2,5 Z"
                                            id="Shape"
                                        />
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}
