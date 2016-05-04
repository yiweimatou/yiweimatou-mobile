import test from 'ava';
import Auth from '../../src/stores/Auth';

const mobile = '13675853598'
test('getcode via mobile',async t => {
    t.true(await Auth.getCode(mobile), 'verification code is send');
});
