
exports.up = function(knex) {
   return knex.schema.createTable("produtos", tbl => {
        tbl.increments ('id');
        tbl.text ("descricao", 255).unique ().notNullable();
        tbl.text ("marca", 128).notNullable();
        tbl.decimal ("valor").notNullable();
    });    
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("produtos");  
};
