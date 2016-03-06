/* @flow */

import querystring from "querystring";
import { OAUTH_AUTHORIZE_URL, OAUTH_TOKEN_URL } from "../constants";

export default function auth(): Object {
  return {
    getAuthenticationUrl: (scope = ["public"]) => {
      let querystrings = querystring.stringify({
        client_id: this._applicationId,
        redirect_uri: this._callbackUrl,
        response_type: "code",
        scope: scope.length > 1
          ? scope.join("+")
          : scope.toString()
      });

      return decodeURIComponent(`${OAUTH_AUTHORIZE_URL}?${querystrings}`);
    },

    userAuthentication: (code: string) => {
      const url = OAUTH_TOKEN_URL;

      return this.request({
        url,
        method: "POST",
        body: {
          client_id: this._applicationId,
          client_secret: this._secret,
          redirect_uri: this._callbackUrl,
          grant_type: "authorization_code",
          code
        },
        oauth: true
      });
    },

    setBearerToken: (accessToken: string) => {
      if (accessToken) {
        this._bearerToken = accessToken;
      }
    }
  };
}
