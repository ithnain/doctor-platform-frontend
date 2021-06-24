//import PropTypes from 'prop-types';
// import styles from './Doctor.module.scss';
import SliderLayout from '@components/Layout';
import AddPatientForm from 'src/components/AddPatientForm'
import useTranslation from 'next-translate/useTranslation';

function createPatient() {
    const { t } = useTranslation('doctor'); 


    return (
        <SliderLayout
            title={t('doctor')}
            keywords={''}
            description={''}>
            <AddPatientForm />
        </SliderLayout>
    );
}

createPatient.propTypes = {};

export default createPatient;
