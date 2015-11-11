var unsplash = new Unsplash({
  applicationId: "{YOUR_APPLICATION_ID}",
  secret: "{YOUR_SECRET}",
  callbackUrl: "{YOUR_CALLBACK_URL}"
});

unsplash.users.profile("naoufal")
.then(Unsplash.toJson)
.then(function (json) {
  console.log(json);
});
