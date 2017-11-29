import { expect } from 'chai';
import resolveRoute from './ResolveRoute';

describe('resolveRoute', () => {
    it('should resolve all the routes', () => {
        const test_cases = [
            ['/', {page: 'PostsIndex', params: ['trending']}],
            ['/about.html', {page: 'About'}],
            ['/faq.html', {page:'Faq'}],
            ['/login.html', {page:'Login'}],
            ['/privacy.html', {page:'Privacy'}],
            ['/support.html', {page:'Support'}],
            ['/xss/test', {page:'NotFound'}],
            ['/tos.html', {page:'Tos'}],
            ['/change_password', {page:'ChangePassword'}],
            ['/create_account', {page:'CreateAccount'}],
            ['/approval', {page:'Approval'}],
            ['/pick_account', {page:'PickAccount'}],
            ['/recover_account_step_1', {page:'RecoverAccountStep1'}],
            ['/recover_account_step_2', {page:'RecoverAccountStep2'}],
            ['/waiting_list.html', {page:'WaitingList'}],
            ['/market', {page:'Market'}],
            ['/~witnesses', {page:'Witnesses'}],
            ['/submit.html', {page:'SubmitPost'}],
        ];
        test_cases.forEach(v => {
            expect(resolveRoute(v[0])).to.deep.equal(v[1]);
        });
    });
});