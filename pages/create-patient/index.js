//import PropTypes from 'prop-types';
// import styles from './Doctor.module.scss';
import SliderLayout from '@components/Layout';
import AddPatientForm from 'src/components/AddPatientForm'
function createPatient() {
    return (
        <SliderLayout
            title={'Doctor'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor page'}>
            <AddPatientForm />
        </SliderLayout>
    );
}

createPatient.propTypes = {};

export default createPatient;
