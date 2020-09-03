import Unsplash, { toJson } from "unsplash-js";

let unsplash = new Unsplash({
  accessKey: "ž",
  secret: "{YOUR_SECRET}"
});

unsplash.users.profile("naoufal")
.then(toJson)
.then(json => {
  console.log(json);
});
