const {
  client,
  createTables,
  createUser,
  createSkill,
  fetchUsers,
  fetchSkills
} = require('./db');

const init = async()=> {
  console.log('connecting to database');
  await client.connect();
  console.log('connected to database');
  await createTables();
  console.log('tables created');
  const [moe, lucy, larry, ethyl, dancing, singing, plateSpinning, juggling] = await Promise.all([
    createUser({ username: 'moe', password: 'moe_pw'}),
    createUser({ username: 'lucy', password: 'lucy_pw'}),
    createUser({ username: 'larry', password: 'larry_pw'}),
    createUser({ username: 'ethyl', password: 'ethyl_pw'}),
    createSkill({ name: 'dancing'}),
    createSkill({ name: 'singing'}),
    createSkill({ name: 'plate spinning'}),
    createSkill({ name: 'juggling'})
  ]);

  console.log(await fetchUsers());
  console.log(await fetchSkills());

}
init();
