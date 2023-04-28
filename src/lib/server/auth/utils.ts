import { randomBytes } from 'crypto';

function generateToken(length: number = 64) {
    return randomBytes(length).toString('hex');
}

export default generateToken;
