import AddPatientForm from 'src/components/AddPatientForm';
import { ConfigProvider } from 'antd';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

function createPatient({ direction }) {
    const { t } = useTranslation('create-patient');
    const router = useRouter();

    return (
        <SliderLayout
            title={t('Register Patient')}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor create patient page'}>
            <ConfigProvider direction={direction}>
                <AddPatientForm direction={direction} id={router.query.id} />
            </ConfigProvider>
        </SliderLayout>
    );
}

createPatient.propTypes = {};

export default authenticatedRoute(createPatient);
