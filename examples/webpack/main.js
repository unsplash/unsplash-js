import Unsplash, { toJson } from "unsplash-js";

let unsplash = new Unsplash({
  accessKey: "{YOUR_ACCESS_KEY}",
  secret: "{YOUR_SECRET}",
  callbackUrl: "{YOUR_CALLBACK_URL}"
});

unsplash.users.profile("naoufal")
.then(toJson)
.then(json => {
  console.log(json);
});
