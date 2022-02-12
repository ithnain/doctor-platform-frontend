import cookie from 'cookie';
import { withSentry } from '@sentry/nextjs';

const handler = async (req, res) => {
    res.json(cookie.parse(req.headers.cookie || ''));
};

export default withSentry(handler);
