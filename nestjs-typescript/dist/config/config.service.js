"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvFilePath = void 0;
const getEnvFilePath = (configService) => {
    const databaseType = configService.get('DATABASE_TYPE');
    switch (databaseType) {
        case 'mongodb':
            return '.mongodb.env';
        case 'mysql':
        default:
            return '.mysql.env';
    }
};
exports.getEnvFilePath = getEnvFilePath;
//# sourceMappingURL=config.service.js.map