const crypto = require('crypto');
// 密碼加密
function Encrypted(password){
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
let cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(password, 'utf8', 'hex');
encrypted += cipher.final('hex');
return encrypted
}
module.exports = Encrypted ;