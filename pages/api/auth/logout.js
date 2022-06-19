import cookie from 'cookie';

export default (req, res) => {
    res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
            httpOnly: true,
            secure: process.env.APP_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/'
        })
    );
    res.statusCode = 200;
    res.json({ success: true });
};
