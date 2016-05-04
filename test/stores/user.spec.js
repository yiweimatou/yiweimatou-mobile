import test from 'ava';
import user from '../../src//stores//user.js';

test('get user by key and token', async t => {
    const key = 9
    const token = '546c6853f71ed65886fb692a5205452113ce5a8e311dd83c9c718c21583b2a98832ec92b64a25de4bf11aa76fa8439548c6ffecb759e93e801e1110cf70afd2e1374c3f38bce6334d58284f8340a8dbc'
    const result = await user.getByKey(key,token)
    
    t.true(result.code === 0);
});