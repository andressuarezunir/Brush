-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Paint" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Study" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
