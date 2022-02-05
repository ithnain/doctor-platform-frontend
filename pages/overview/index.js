import AdminOverview from '@src/components/Admin/Overview';
import PropTypes from 'prop-types';
import SliderLayout from '@components/Layout';
import { dehydrate, QueryClient } from 'react-query';
import authenticatedRoute from '@components/AuthenticatedRoute';

function Overview({ direction, userData }) {
    return (
        <SliderLayout
            title={'Overview'}
            keywords={'doctor,platform,any word'}
            description={'this is the doctor overview'}
            active={`/overview`}>
            <AdminOverview
                direction={direction}
                // doctors={doctors}
                id={userData?.data.id}
                name={userData?.data.name}
            />
        </SliderLayout>
    );
}

Overview.propTypes = {
    direction: PropTypes.string.isRequired,
    doctors: PropTypes.array,
    userData: PropTypes.object
};
export const getServerSideProps = async () => {
    const qClient = new QueryClient();

    return {
        props: {
            dehydratedState: dehydrate(qClient)
        }
    };
};
export default authenticatedRoute(Overview);
