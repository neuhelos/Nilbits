"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
exports.default = {
    dbName: 'nilbits',
    type: 'postgresql',
    entities: [Post_1.Post],
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map