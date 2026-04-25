export type KeycloakUser = {
    id: string;
    username: string;
    email: string;
} & {
    [key: string]: unknown;
};
