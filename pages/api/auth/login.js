import cookie from 'cookie';
import { withSentry } from '@sentry/nextjs';

const handler = async (req, res) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', req.body.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 10 * 365 * 24 * 60 * 60,
            sameSite: 'strict',
            path: '/'
        })
    );
    res.statusCode = 200;
    res.json({ success: true });
};

export default withSentry(handler);
