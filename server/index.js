const {
  client,
  createTables,
  createUser,
  createSkill,
  fetchUsers,
  fetchSkills,
  createUserSkill,
  fetchUserSkills,
  deleteUserSkill
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

  const userSkills = await Promise.all([
    createUserSkill({ user_id: moe.id, skill_id: plateSpinning.id}),
    createUserSkill({ user_id: moe.id, skill_id: dancing.id}),
    createUserSkill({ user_id: ethyl.id, skill_id: singing.id})
  ]);
  console.log(await fetchUserSkills(moe.id));
  await deleteUserSkill({ user_id: moe.id, id: userSkills[0].id});
  console.log(await fetchUserSkills(moe.id));

}
init();
