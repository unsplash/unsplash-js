import Unsplash, { toJson } from "unsplash";

let unsplash = new Unsplash({
  applicationId: "{YOUR_APPLICATION_ID}",
  secret: "{YOUR_SECRET}",
  callbackUrl: "{YOUR_CALLBACK_URL}"
});

unsplash.users.profile("naoufal")
.then(toJson)
.then(json => {
  console.log(json);
});
