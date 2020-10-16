const { v4: uuidv4 } = require('uuid');

function referralCodeGenerator() {
    return uuidv4();
}

module.exports = referralCodeGenerator