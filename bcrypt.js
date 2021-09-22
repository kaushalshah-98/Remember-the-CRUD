const bcrypt = require('bcryptjs');


async function generateHashedPassword(password) {
    const hash = await bcrypt.hash(password, 10)
    return hash;
}

async function checkPassword(password, hashedPass) {
    const isPassword = await bcrypt.compare(password, hashedPass);
    return isPassword

}

module.exports = {
generateHashedPassword,
checkPassword
}
