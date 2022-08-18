"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1659474569765 = void 0;
class CoffeeRefactor1659474569765 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }
}
exports.CoffeeRefactor1659474569765 = CoffeeRefactor1659474569765;
//# sourceMappingURL=1659474569765-CoffeeRefactor.js.map