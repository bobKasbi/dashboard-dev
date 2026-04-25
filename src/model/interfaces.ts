export interface RuntimeConfig {
    environment: string;
    apiBaseUrl: string;
    auth: {
        enabled: boolean;
        authority: string;
        realm: string;
        clientId: string;
    };
    BG_COLOR?: string;
    FONT_COLOR?: string;
    CUSTOM_HEADER?: string;
}
