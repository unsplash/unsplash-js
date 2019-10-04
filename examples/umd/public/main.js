var unsplash = new Unsplash({
  accessKey: "{YOUR_ACCESS_KEY}",
  secret: "{YOUR_SECRET}",
  callbackUrl: "{YOUR_CALLBACK_URL}"
});

unsplash.users.profile("naoufal")
.then(Unsplash.toJson)
.then(function (json) {
  console.log(json);
});
