const images = require('./utils/images')
const random = require('./utils/random')


exports.seed = async function (knex) {

  await knex('products').del()
  const users = await knex('users').limit(10).select('id')


  let array = []

  for (let i = 0; i < 100; i++) {
    array.push(data(i, users))
  }

return  await knex('products').insert(array);
};

function data(i, users) {
  return {
    name: 'A ' + i + ' fled by skots fled by skots fled by skots fled by skots fled by skots',
    slug: 'a-'+i+'-fled-knmbv-fled-knmbv-fled-knmbv-fled-knmbv-fled-knmbv-fled-knmbv-',
    featured_image: images[random(0, images.length)],
    images:JSON.stringify(images[random(0, images.length)],images[random(0, images.length)]),
    price: random(3000, 4000),
    sale_price: random(1500, 2500),
    total_sales: random(6000, 12000),
    status: 'published',
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
    average_rating: random(4, 5),
    rating_count: random(400, 600),
    reviews_count: random(400, 600),
    related_ids: JSON.stringify([1, 2, 3, 4, 5]),
    upsell_ids: JSON.stringify([1, 2, 3, 4, 5]),
    short_description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor quibusdam numquam dolor, fugiat molestiae maiores voluptas ratione...`,
    description: `<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><figure class="image"><img src="http://127.0.0.1:3000/img/21_7/img750_1626029890357_prfcv1.jpg"></figure><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>&nbsp;</p><figure class="image"><img src="http://127.0.0.1:3000/img/21_7/img144_1626029817184.jpeg"></figure><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda quibusdam numquam dolor, fugiat molestiae maiores vel consectetur sequi accusantium quo, corrupti inventore at quia deserunt eius odio commodi voluptas ratione.</p><p>&nbsp;</p><p>&nbsp;</p>`,
  }
}