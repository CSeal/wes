import * as React from 'react';
import transl from '../../utils/t.decorator';
import { GenericProps } from '../../interfaces/GenericProps.interface';
import i18n from '../../i18n';

export interface FooterProps extends GenericProps {
}

@transl()
export class Footer extends React.Component<FooterProps, any> {
  changeLanguage(lang: string) {
     i18n.changeLanguage(lang);
  }
  render() {
    const { t } = this.props;
    return (
    <footer id="footer">
        <div className="container-fluid">
            <div className="row">
                <ul className="menu-list">
                    <li><a href="https://wes-english.com/policy" target="_blank">{t('Privacy')}</a></li>
                    <li><a href="https://wes-english.com/faq" target="_blank">{t('FAQ')}</a></li>
                    <li>
                        {/* <select
                            onChange={(e) => this.changeLanguage(e.target.value)}
                            style={{backgroundColor: 'transparent', color: '#999999', fontWeight: 500}}
                            value={i18n.language}
                        >
                            <option value="en">{t('English')}</option>
                            <option value="de">{t('German')}</option>
                            <option value="ru" disabled={true}>{t('Russian')}</option>
                        </select> */}
                    </li>
                </ul>
            </div>
        </div>
    </footer>
    );
  }
}
