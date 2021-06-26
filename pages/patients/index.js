// import PropTypes from 'prop-types';
// import styles from './Patients.module.scss';
import SliderLayout from '@components/Layout';

function Patients() {
    return (
        <SliderLayout
            title={'Overview'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}
            active={`/patients`}></SliderLayout>
    );
}

Patients.propTypes = {};

export default Patients;
