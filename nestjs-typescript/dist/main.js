"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Playlist API')
        .setDescription('The playlist API description')
        .setVersion('1.0')
        .addTag('playlist')
        .addTag('users')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3002);
}
bootstrap();
//# sourceMappingURL=main.js.map