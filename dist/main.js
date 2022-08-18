"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeout_interceptor_1 = require("./common/interceptors/timeout.interceptor");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const wrap_response_interceptor_1 = require("./common/interceptors/wrap-response.interceptor");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const PORT = 3000;
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new wrap_response_interceptor_1.WrapResponseInterceptor(), new timeout_interceptor_1.TimeoutInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Hello world')
        .setDescription('Hello world application')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map