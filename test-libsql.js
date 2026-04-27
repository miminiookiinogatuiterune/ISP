import { createClient } from '@libsql/client';
const client = createClient({ url: 'libsql://test.turso.io', authToken: 'test' });
console.log(client);
