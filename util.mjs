export const setDefaultRoute = (uri) => {
    location.hash = uri;
}

export const getDefaultRoute = () => {
    return location.hash || '#/';
}