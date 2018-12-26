import * as React from 'react';
import * as classnames from 'classnames';
import transl from '../../../../utils/t.decorator';
import { Field, FieldRenderProps } from 'react-final-form';
import { ChainSVG } from '../../../../components/ButtonsSVG/Chain';
import { ProfilesStore } from '../../../../stores/Profiles.store';
import { observer, inject } from 'mobx-react';
import { NewUsersDocument, UpdateUsersDocument } from '../../../../services/api';
import { TranslationFunction } from 'react-i18next';

interface CommonProfileUploadComponentProps {
    profilesStore?: ProfilesStore;
    t?: TranslationFunction;
}

interface CommonProfileUploadComponentState {
    contract?: {name: string};
    contractPreviewUrl?: string;
}

@transl()
@inject('profilesStore')
@observer
export class CommonProfileUploadComponent extends React.Component<CommonProfileUploadComponentProps, CommonProfileUploadComponentState> {
    constructor(props: CommonProfileUploadComponentProps) {
        super(props);
        this.state = {contract: {name: ''}, contractPreviewUrl: ''};
    }
    handleContractChange(e: any): void {
        e.preventDefault();
        const contract = this.props.profilesStore.contract$.current();
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                contract: file,
                contractPreviewUrl: reader.result,
            });
            if (!contract || !contract[0]) {
                const newContract: NewUsersDocument = {document_name: this.state.contract.name, document: this.state.contractPreviewUrl};
                this.props.profilesStore.addContract(newContract);
            } else {
                const updatedContract: UpdateUsersDocument = {
                    user_document_id: this.props.profilesStore.contract$.current()[0].id,
                    document_name: this.state.contract.name,
                    document: this.state.contractPreviewUrl,
                };
                this.props.profilesStore.changeContract(updatedContract);
            }
        };

        reader.readAsDataURL(file);
    }

    render(): React.ReactNode {
        const { t, profilesStore } = this.props;
        const contracts = profilesStore.contract$.current();

        return (
            <fieldset>
                <div className="row">
                    <div className="col-md-12">
                        <legend>{t('Contract')}</legend>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <a className="contract-link" style={{overflow: 'hidden', position: 'relative', display: 'inline-block', width: '200px', height: '20px', lineHeight: '20px', textAlign: 'left'}}>
                                <ChainSVG />
                                {contracts && contracts[0] ? contracts[0].document_name : 'Contract.pdf'}
                                <input type="file" accept="application/pdf" style={{position: 'absolute', left: 0, top: 0, opacity: 0, fontSize: '200px'}} onChange={(e) => this.handleContractChange(e)}/>
                            </a>
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }

}
