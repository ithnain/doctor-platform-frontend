import { useEffect } from 'react';
import { useRouter } from 'next/router';
function NotFoundPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/overview');
    }, []);
    return <></>;
}

export default NotFoundPage;
