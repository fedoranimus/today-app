import { Aurelia, PLATFORM } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { OAuthService, OAuthTokenService } from 'aurelia-oauth';

export function configure(aurelia: Aurelia): void {
    const httpClient = <HttpClient>aurelia.container.get(HttpClient);
    
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin(PLATFORM.moduleName('aurelia-oauth'), (oauthService: OAuthService, oauthTokenService: OAuthTokenService, configureClient: any) =>
            configureOAuth(oauthService, oauthTokenService, configureClient, httpClient));


    aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}

function configureOAuth(oauthService: OAuthService, oauthTokenService: OAuthTokenService, configureClient: (client: any) => void, client: any) {
    oauthService.configure(
        {
            loginUrl: 'https://todoist.com/oauth/authorize',
            logoutUrl: '',
            clientId: 'bdf2c7fb5a1e4467af686143ea008331', //TODO: Put this in a config file
            scope: 'data:read_write',
            state: 'secretstring' //TODO: Put this in a config file
        }
    );

    oauthTokenService.configure(
        {
            name: 'token id_token',
            urlTokenParameters: {
                idToken: 'id_token'
            }
        }
    );

    configureClient(client);
}