import cookie from 'cookie';

export default (req, res) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', req.body.token, {
            httpOnly: true,
            secure: process.env.APP_ENV !== 'development', 
            maxAge: 10 * 365 * 24 * 60 * 60,
            sameSite: 'strict',
            path: '/'
        })
    );
    res.statusCode = 200;
    res.json({ success: true });
};
