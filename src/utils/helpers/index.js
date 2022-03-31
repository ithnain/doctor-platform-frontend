export const parseJwt = (token) => {
    if (!token) {
        return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};
export const isValidName = (text = '') => {
    // removes extra white spaces
    const trimmed = text.replace(/\s+/g, ' ').trim();
    if (trimmed) {
        const isMoreThanOne = trimmed.split(' ').length !== 1;
        if (!isMoreThanOne) {
            return false;
        }
    }
    const regex = /^([a-zA-Zء-ي]{2,}|\s[a-zA-Zء-ي]{2,}){2,}$/;
    return regex.test(trimmed);
};
