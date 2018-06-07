// O mongoose e utilizado para fazer o mapeamento objeto-registro com o MongoDB
const mongoose = require('mongoose');
// const Schema = mongoose.Schema; A linha abaixo é equivalente a essa
const { Schema } = mongoose;

// Definimos o esquema que será utilizado pelo MongoDB
// Definimos que o googleID é um campo obrigatório para cada registro
const userSchema = new Schema({
	googleID: String
});

// Definimos o modelo com nome users e o esquema supradefinido
mongoose.model('users', userSchema);