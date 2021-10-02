import AddPatientForm from 'src/components/AddPatientForm';
//import PropTypes from 'prop-types';
// import styles from './Doctor.module.scss';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';
import useTranslation from 'next-translate/useTranslation';

function createPatient() {
    const { t } = useTranslation('create-patient');

    return (
        <SliderLayout title={t('Register Patient')} keywords={''} description={''}>
            <AddPatientForm />
        </SliderLayout>
    );
}

createPatient.propTypes = {};

export default authenticatedRoute(createPatient);
