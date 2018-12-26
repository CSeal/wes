import { toast } from 'react-toastify';
import { t } from 'i18next';

export async function westoast (
        processor: Promise<any>,
        options: {
            processingMessage?: string,
            successMessage?: string,
            errorMessage?: string,
            entityName?: string,
            autoClose?: number,
        } = {},
    ): Promise<void> {
    const {
        autoClose = 5000,
        entityName = '',
        processingMessage = t('Processing ') + entityName,
        successMessage = t('Successfully processed ') + entityName,
        errorMessage = t('Sorry, but there is some error while processing ') + entityName,
    } = options;

    const toastId = toast(processingMessage, { closeButton: false });
    return processor
            .then(() => toast.update(toastId, { render: successMessage, type: 'info', autoClose: 4000, hideProgressBar: true }))
            .catch((err) => {
                const errMsg = typeof err === 'object' ? JSON.stringify(err) : err;
                toast.update(toastId, { render: errorMessage + ' ' + errMsg, type: 'error' });
                // tslint:disable-next-line:no-console
                console.error(errMsg);
            });
}
