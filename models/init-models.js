var DataTypes = require("sequelize").DataTypes;
var _administrador = require("./administrador");
var _chef = require("./chef");
var _comentarios = require("./comentarios");
var _comercio = require("./comercio");
var _estabelecimento = require("./estabelecimento");
var _evento = require("./evento");
var _favoritos = require("./favoritos");
var _postagem = require("./postagem");
var _premio = require("./premio");
var _receita = require("./receita");
var _usuario = require("./usuario");
var _usuariocomum = require("./usuariocomum");

function initModels(sequelize) {
  var administrador = _administrador(sequelize, DataTypes);
  var chef = _chef(sequelize, DataTypes);
  var comentarios = _comentarios(sequelize, DataTypes);
  var comercio = _comercio(sequelize, DataTypes);
  var estabelecimento = _estabelecimento(sequelize, DataTypes);
  var evento = _evento(sequelize, DataTypes);
  var favoritos = _favoritos(sequelize, DataTypes);
  var postagem = _postagem(sequelize, DataTypes);
  var premio = _premio(sequelize, DataTypes);
  var receita = _receita(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);
  var usuariocomum = _usuariocomum(sequelize, DataTypes);

  comentarios.belongsTo(postagem, { as: "id_post_postagem", foreignKey: "id_post"});
  postagem.hasMany(comentarios, { as: "comentarios", foreignKey: "id_post"});
  comercio.belongsTo(postagem, { as: "id_post_comerc_postagem", foreignKey: "id_post_comerc"});
  postagem.hasOne(comercio, { as: "comercio", foreignKey: "id_post_comerc"});
  evento.belongsTo(postagem, { as: "id_post_evento_postagem", foreignKey: "id_post_evento"});
  postagem.hasOne(evento, { as: "evento", foreignKey: "id_post_evento"});
  receita.belongsTo(postagem, { as: "id_post_receita_postagem", foreignKey: "id_post_receita"});
  postagem.hasOne(receita, { as: "receitum", foreignKey: "id_post_receita"});
  administrador.belongsTo(usuario, { as: "id_user_adm_usuario", foreignKey: "id_user_adm"});
  usuario.hasOne(administrador, { as: "administrador", foreignKey: "id_user_adm"});
  chef.belongsTo(usuario, { as: "id_user_chef_usuario", foreignKey: "id_user_chef"});
  usuario.hasOne(chef, { as: "chef", foreignKey: "id_user_chef"});
  comentarios.belongsTo(usuario, { as: "id_user_usuario", foreignKey: "id_user"});
  usuario.hasMany(comentarios, { as: "comentarios", foreignKey: "id_user"});
  estabelecimento.belongsTo(usuario, { as: "id_user_estab_usuario", foreignKey: "id_user_estab"});
  usuario.hasOne(estabelecimento, { as: "estabelecimento", foreignKey: "id_user_estab"});
  favoritos.belongsTo(usuario, { as: "id_user_usuario", foreignKey: "id_user"});
  usuario.hasMany(favoritos, { as: "favoritos", foreignKey: "id_user"});
  postagem.belongsTo(usuario, { as: "id_user_usuario", foreignKey: "id_user"});
  usuario.hasMany(postagem, { as: "postagems", foreignKey: "id_user"});
  premio.belongsTo(usuario, { as: "id_user_usuario", foreignKey: "id_user"});
  usuario.hasOne(premio, { as: "premio", foreignKey: "id_user"});
  usuariocomum.belongsTo(usuario, { as: "id_user_com_usuario", foreignKey: "id_user_com"});
  usuario.hasOne(usuariocomum, { as: "usuariocomum", foreignKey: "id_user_com"});

  return {
    administrador,
    chef,
    comentarios,
    comercio,
    estabelecimento,
    evento,
    favoritos,
    postagem,
    premio,
    receita,
    usuario,
    usuariocomum,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
