import config from 'universal-config';
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: config.get('ACCESS_KEY')
});

users();
photos();
collections();

function users() {
  console.log("\nUsers")

  unsplash.users.profile('naoufal')
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.users.photos("naoufal")
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.users.likes("naoufal")
    .then(toJson)
    .then(json => {
      console.log(json);
     });
}

function photos() {
  console.log("\nPhotos");

  unsplash.photos.listPhotos(1, 10)
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.photos.getPhoto("kZ8dyUT0h30")
    .then(toJson)
    .then(json => {
      console.log(json);
    });

  unsplash.photos.getRandomPhoto({ featured: true })
    .then(toJson)
    .then(json => {
      console.log(json.links.html);
    });
}

function collections() {
  console.log("\nCollections");

   unsplash.collections.listCollections(1, 10)
     .then(toJson)
     .then(json => {
       console.log(json);
     });

   unsplash.collections.getCollection(151165)
     .then(toJson)
     .then(json => {
       console.log(json);
     });

   unsplash.collections.getCollectionPhotos(151165)
     .then(toJson)
     .then(json => {
       console.log(json);
     });
}
