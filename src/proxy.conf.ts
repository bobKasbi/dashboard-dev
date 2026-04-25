const proxyConfig = [
    {
        context: '/products/',
        target: 'https://fakestoreapi.com',
        secure: true,
        changeOrigin: true,
    },
];

module.exports = proxyConfig;
