const db = require('./db');
const Campus = require('./db/models/campus');
const User = require('./db/models/user');

const campuses = [{
  name: 'really_random',
  location: 'Grand Rapids'
}, {
  name: 'generally_speaking',
  location: 'Ann Arbor'
}, {
  name: 'dogs_of_fullstack',
  location: 'New York'
}, {
  name: 'lunch_planning',
  location: 'Piedra Blanca'
}];

const users = [{
  name: 'Cody',
  image: '/images/cody.jpg'
}, {
  name: 'Ben',
  image: '/images/ben.jpg'
}, {
  name: 'Star',
  image: '/images/star.jpg'
}, {
  name: 'Batman',
  image: '/images/batman.jpg'
}, {
  name: 'Elliott',
  image: '/images/elliott.jpg'
}, {
  name: 'Fira',
  image: '/images/fira.jpg'
}, {
  name: 'Henry',
  image: '/images/henry.jpg'
}, {
  name: 'Marcy',
  image: '/images/marcy.jpg'
}, {
  name: 'Milton',
  image: '/images/milton.jpg'
}, {
  name: 'Murphy',
  image: '/images/murphy.jpg'
}, {
  name: 'Raffi',
  image: '/images/raffi.jpg'
}, {
  name: 'Tulsi',
  image: '/images/tulsi.jpg'
}, {
  name: 'Pork Chop',
  image: '/images/pork_chop.jpg'
}, {
  name: 'Ribs',
  image: '/images/ribs.jpg'
}, {
  name: 'Stacey',
  image: '/images/stacey.jpg'
}, {
  name: 'JD',
  image: '/images/jd.jpg'
}, {
  name: 'BenBen',
  image: '/images/benben.png'
}, {
  name: 'Odie',
  image: '/images/odie.jpg'
}];

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campus.create(campus))
  )
  .then(() =>
  Promise.all(users.map(user =>
    User.create(user))
  ))
  // .then(() =>
  // Promise.all(messages.map(message =>
  //   Message.create(message))
  // )

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
