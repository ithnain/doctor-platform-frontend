import AdminOverview from '@src/components/Admin/Overview';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';

function Overview({ direction }) {
    return (
        <SliderLayout
            title={'Overview'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}
            active={`/overview`}>
            <AdminOverview
                direction={direction}
                // doctors={doctors}
            />
        </SliderLayout>
    );
}

Overview.propTypes = {
    direction: PropTypes.string.isRequired,
    doctors: PropTypes.array
};

export default authenticatedRoute(Overview);
