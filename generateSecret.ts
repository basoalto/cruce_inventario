import { randomBytes } from 'crypto';

const generateSecret = (): string => {
  return randomBytes(32).toString('base64');
};

console.log('NEXTAUTH_SECRET=', generateSecret());
