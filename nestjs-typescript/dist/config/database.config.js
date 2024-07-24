"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const playlist_entity_1 = require("../playlist/entities/playlist.entity");
const user_entity_1 = require("../users/entities/user.entity");
exports.databaseConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'phuoctt',
    password: 'phuoctt',
    database: 'youtube',
    entities: [user_entity_1.Users, playlist_entity_1.Playlist],
};
//# sourceMappingURL=database.config.js.map