/* @flow */

import URI from "urijs";

import { OAUTH_AUTHORIZE_URL, OAUTH_TOKEN_URL } from "../constants";

export default function auth(): Object {
  return {
    getAuthenticationUrl: (scope = ["public"]) => {
      return URI(OAUTH_AUTHORIZE_URL)
        .query({
          client_id: this._applicationId,
          redirect_uri: this._callbackUrl,
          response_type: "code",
          scope: scope.length > 1
            ? scope.join("+")
            : scope.toString()
        })
        .readable();
    },

    userAuthentication: ( code) => {
      const url = OAUTH_TOKEN_URL;

      return this.request({
        url,
        method: "POST",
        body: {
          client_id: this._applicationId,
          client_secret: this._secret,
          redirect_uri: this._callbackUrl,
          code: code,
          grant_type: "authorization_code"
        },
        oauth: true
      });
    }
  };
}
