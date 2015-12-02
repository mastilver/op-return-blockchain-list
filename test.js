'use strict';
import test from 'ava';
import opReturnBlockchainList from './index';

test(t => {
    t.ok(Array.isArray(opReturnBlockchainList));
    t.end();
});
