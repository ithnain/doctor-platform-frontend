import AdminOverview from '@src/components/Admin/Overview';
//import PropTypes from 'prop-types';
// import styles from './Doctor.module.scss';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';

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

// export default Overview;
export default authenticatedRoute(Overview, { pathAfterFailure: '/login' });
