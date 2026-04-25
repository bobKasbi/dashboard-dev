// target prod: "https://demo.servicelayers.io"
/*const PROXY_CONFIG = [
  {
    context: ['/oauth/**', '/dashboard/**'],
    target: 'https://demo.dev-servicelayers.io/',
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
];*/

// module.exports = PROXY_CONFIG;

const PROXY_CONFIG = [
    {
        context: ['/realms/**', '/admin/**'], // Keycloak
        target: 'https://keycloak.app-auth.net',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
            Connection: 'keep-alive',
        },
    },
    {
        context: ['/products/**'], // FakeStore
        target: 'https://fakestoreapi.com',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
            Connection: 'keep-alive',
        },
    },
    {
        context: ['/api/**'], // Keycloak BFF
        target: 'https://api.dev.dashboard-app.net',
        secure: false,
        changeOrigin: true,
        logLevel: 'debug',
        // `/api` is a frontend-only namespace.
        // BFF does not know `/api`, so we strip it before forwarding (`/api/users` → `/users`).
        // pathRewrite: { '^/api': '' },
        headers: {
            Connection: 'keep-alive',
        },
    },
];

export default PROXY_CONFIG;
