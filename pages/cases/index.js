//import PropTypes from 'prop-types';
// import styles from './Cases.module.scss';
import SliderLayout from '@components/Layout';

function Cases() {
    return (
        <SliderLayout
            title={'Cases'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor cases'}
            active={`/cases`}>
            Cases
        </SliderLayout>
    );
}

Cases.propTypes = {};

export default Cases;
