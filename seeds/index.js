const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp2'), {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"))
db.once("open", () => {
    console.log("Database Connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seeDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //Your user id
            author : '61610fdc6f5481c657b94918',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quisquam odio atque voluptatibus asperiores quia veniam hic sint rerum, provident libero ad mollitia! Debitis corrupti deleniti soluta, inventore nulla quia.',
            price,
            geometry: { 
              type: 'Point', 
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dz4405nmb/image/upload/v1634010334/YelpCamp/uokth2n58cwattl5lqj2.png',
                  filename: 'YelpCamp/uokth2n58cwattl5lqj2'
                },
                {
                  url: 'https://res.cloudinary.com/dz4405nmb/image/upload/v1634010334/YelpCamp/pqz0dtctawtjdatvlw8h.png',
                  filename: 'YelpCamp/pqz0dtctawtjdatvlw8h'
                }
              ],
            
        })
        await camp.save();
    }
}

seeDB().then(() => {
    mongoose.connection.close();
});