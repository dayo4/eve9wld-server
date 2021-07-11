const images = require('./utils/images')
const random = require('./utils/random')


exports.seed = async function (knex) {

  await knex('posts').del()

  const users = await knex('users').limit(10).select('id')

  let array = []

  for (let i = 0; i < 100; i++) {
    array.push(data(i, users))
  }

return  await knex('posts').insert(array);
};

function data(i, users) {
  return {
    title: 'A ' + i + ' ',
    slug: 'a-'+i+'-f',
    featured_image: images[random(images.length, images.length)],
    status: 'published',
    type: 'post',
    categories: JSON.stringify([
      'Some Categories',
      'Some Categories',
      'Some Categories',
      'Some Categories',
      'Some Categories',
      'Some Categories',
      'Some Categories',
      'Some Categories',
    ]),
    tags: JSON.stringify(
      [
        'Some Tags',
        'Some Tags',
        'Some Tags',
        'Some Tags',
        'Some Tags',
        'Some Tags',
        'Some Tags',
        'Some Tags',
      ],
    ),
    user_id: users[random(1, 10)].id,
    comments_count: random(400, 600),
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor quibusdam numquam dolor, fugiat molestiae maiores voluptas ratione...`,
    content: `<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><figure class="image"><img src="http://127.0.0.1:3000/img/21_7/img750_1626029890357_prfcv1.jpg"></figure><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>&nbsp;</p><figure class="image"><img src="http://127.0.0.1:3000/img/21_7/img144_1626029817184.jpeg"></figure><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>&nbsp;</p><p>&nbsp;</p>`,
  }
}