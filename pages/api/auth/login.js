import cookie from 'cookie';

export default (req, res) => {
    console.log(process.env.NODE_ENV)
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', req.body.token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV !== 'development',
            secure: false,
            maxAge: 10 * 365 * 24 * 60 * 60,
            sameSite: 'none',
            path: '/',
        })
    );
    res.statusCode = 200;
    res.json({ success: true });
};
