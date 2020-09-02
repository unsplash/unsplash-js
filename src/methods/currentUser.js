export default function currentUser() {
  return {
    profile: () => {
      const url = "/me";

      return this.request({
        url,
        method: "GET"
      });
    },

    updateProfile: (options = {}) => {
      const endpointUrl = "/me";

      let {
        username,
        firstName,
        lastName,
        email,
        url,
        location,
        bio,
        instagramUsername
      } = options;

      let body = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        url,
        location,
        bio,
        instagram_username: instagramUsername
      };

      Object.keys(body).forEach(key => {
        if (!body[key]) {
          delete body[key];
        }
      });

      return this.request({
        url: endpointUrl,
        method: "PUT",
        body
      });
    }
  };

}
