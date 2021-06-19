//import PropTypes from 'prop-types';
// import styles from './Hospital.module.scss';
import SliderLayout from '@components/Layout';

function Hospital() {
    return (
        <SliderLayout
            title={'Hospital'}
            keywords={'doctor,platform,any word'}
            description={"this is the doctor's hospital"}>
            Hospital
        </SliderLayout>
    );
}

Hospital.propTypes = {};

export default Hospital;
