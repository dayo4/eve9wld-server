const images = require('./utils/images')
const random = require('./utils/random')
const createFirstUser = require('../src/config/initConfig')

exports.seed = async function (knex) {

  await knex('users').del()

  await createFirstUser.init()

  let array = []

  for (let i = 0; i < 100; i++) {
    array.push(data(i))
  }

 return await knex('users').insert(array);
};

function data(i) {
  return {
    first_name: 'FirstName' + i,
    last_name: 'LastName' + i,
    profile_image: images[random(images.length, images.length)],
    account_status: 'active',
    username: 'user'+i+'-name',
    email: 'user'+i+'@test.com',
    status: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    password: '12345678'
  }
}