import cookie from 'cookie';

export default (req, res) => {
    res.json(cookie.parse(req.headers.cookie || ''));
};
