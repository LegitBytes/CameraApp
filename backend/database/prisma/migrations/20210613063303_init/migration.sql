-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "is_disabled" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "sites" ADD COLUMN     "is_disabled" BOOLEAN DEFAULT false;
