import validator from 'validator';

import RequestLogger from './../../src/middleware/request-logger';
import Sanitizer from './../../src/middleware/sanitizer';
import JsonContentType from './../../src/middleware/json-content-type';

export default [
    new RequestLogger(),
    new Sanitizer(validator)
];
