"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaSync1659475249654 = void 0;
class SchemaSync1659475249654 {
    constructor() {
        this.name = 'SchemaSync1659475249654';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "description" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
    }
}
exports.SchemaSync1659475249654 = SchemaSync1659475249654;
//# sourceMappingURL=1659475249654-SchemaSync.js.map