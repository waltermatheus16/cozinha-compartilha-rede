const bcrypt = require('bcrypt');

async function generatePassword() {
  const password = '123456';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Senha original:', password);
  console.log('Senha criptografada:', hashedPassword);
}

generatePassword();
