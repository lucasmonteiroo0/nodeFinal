exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuarios').del()
  await knex('usuarios').insert([
    {id: 1, nome: 'Administrador', login: 'admin', senha: '1234', email: 'ricardo.soares@Vettorelog.com.br', roles: 'ADMIN'},
    {id: 2, nome: 'Usuario', login: 'user', senha: '1234', email: 'ricardo.soares@Vettorelog.com.br', roles: 'USER'}
  ]);
};
