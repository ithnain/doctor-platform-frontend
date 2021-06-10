import { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
function NotFoundPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/');
    }, []);
    return <></>;
}

NotFoundPage.propTypes = {};

export default NotFoundPage;
