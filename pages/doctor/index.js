//import PropTypes from 'prop-types';
// import styles from './Doctor.module.scss';
import SliderLayout from '@components/Layout';

function Doctor() {
    return (
        <SliderLayout
            title={'Doctor'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor page'}
            active={`/doctor`}>
            Doctor
        </SliderLayout>
    );
}

Doctor.propTypes = {};

export default Doctor;
