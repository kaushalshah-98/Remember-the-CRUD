const bcrypt = require('bcryptjs');

async function generateHashedPassword(password) {
    const hash = await bcrypt.hash(password, 8)
}

async function checkPassword(password, hashedPass) {
    const isPassword = await bcrypt.compare(password, hashedPass);

}
