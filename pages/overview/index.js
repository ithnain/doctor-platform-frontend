import API from '@utils/axios';
import AdminOverview from '@src/components/Admin/Overview';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import authenticatedRoute from '@components/AuthenticatedRoute';

function Overview({ direction, doctors }) {
    return (
        <SliderLayout
            title={'Overview'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}
            active={`/overview`}>
            <AdminOverview direction={direction} doctors={doctors} />
        </SliderLayout>
    );
}

Overview.propTypes = {
    direction: PropTypes.string.isRequired,
    doctors: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired
};
export const getServerSideProps = async ({ req }) => {
    try {
        const res = await API.get(`/supervisor/doctors?page=1&limit=3`, {
            headers: {
                Authorization: `Bearer ${req.cookies.token}`
            }
        });
        const { data } = res;
        return {
            props: {
                doctors: data.data
            }
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                doctors: []
            }
        };
    }
};
export default authenticatedRoute(Overview, { pathAfterFailure: '/login' });
