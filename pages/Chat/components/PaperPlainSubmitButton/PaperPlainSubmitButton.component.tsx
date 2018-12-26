import * as React from 'react';
import { PaperPlaneSVG } from '../../../../components/ButtonsSVG/PaperPlane';

export interface PaperPlainSubmitButtonProps {
}

export class PaperPlainSubmitButtonComponent extends React.PureComponent<PaperPlainSubmitButtonProps> {
    render(): React.ReactNode {
        return (
            <button type="submit" className="submit">
                <PaperPlaneSVG />
            </button>
        );
    }
}
