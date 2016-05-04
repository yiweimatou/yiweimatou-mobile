import test from 'ava';
import organ from '../../src/stores/organization.js';

test('get organization list by given limit and offset',async t => {
    let result = await organ.getList()
    t.true(result.code === 0)
});

test('get an organization', async t => {
    let result = await organ.getById(10)
    t.true(result.code === 0 ,'get one organization')
})