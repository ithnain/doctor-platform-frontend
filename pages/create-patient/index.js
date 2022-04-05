import AddPatientForm from 'src/components/AddPatientForm';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

function createPatient({ direction, userdata }) {
    const { t } = useTranslation('create-patient');
    const router = useRouter();
    return (
        <SliderLayout
            title={t('Register Patient')}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor create patient page'}>
            <AddPatientForm direction={direction} id={router.query.id} userdata={userdata} />
        </SliderLayout>
    );
}

createPatient.propTypes = {};

export default authenticatedRoute(createPatient);
