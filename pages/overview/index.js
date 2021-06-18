import AdminOverview from '@src/components/Admin/Overview';
//import PropTypes from 'prop-types';
// import styles from './Doctor.module.scss';
import SliderLayout from '@components/Layout';
function Overview() {
    return (
        <SliderLayout
            title={'Overview'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}>
            <AdminOverview />
        </SliderLayout>
    );
}

Overview.propTypes = {};

export default Overview;
