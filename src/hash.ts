import { randomBytes, randomUUID } from 'crypto';

export const randomHash = (length: number = 20) => {
    return randomBytes(length).toString('hex');
}

export const uuid = () => randomUUID();
