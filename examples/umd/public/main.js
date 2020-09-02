var unsplash = new Unsplash({
  accessKey: "{YOUR_ACCESS_KEY}",
  secret: "{YOUR_SECRET}"
});

unsplash.users.profile("naoufal")
.then(Unsplash.toJson)
.then(function (json) {
  console.log(json);
});
