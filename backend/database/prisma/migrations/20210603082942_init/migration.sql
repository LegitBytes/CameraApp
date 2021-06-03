-- CreateTable
CREATE TABLE "cameras" (
    "camera_id" UUID NOT NULL,
    "camera_name" VARCHAR(255),
    "change_name" VARCHAR(255),
    "camera_ip" VARCHAR(255),
    "total_request" INTEGER,
    "smtp_user_name" VARCHAR(255),
    "smtp_password" VARCHAR(255),
    "group_id" UUID,
    "site_id" UUID,
    "integrator_id" UUID,
    "email" VARCHAR(255),
    "is_disabled" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("camera_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "customer_id" UUID NOT NULL,
    "customer_name" VARCHAR(255),
    "change_name" VARCHAR(255),
    "group_id" UUID,
    "integrator_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "groups" (
    "group_id" UUID NOT NULL,
    "group_name" VARCHAR(255),
    "change_name" VARCHAR(255),
    "is_disabled" BOOLEAN DEFAULT false,
    "integrator_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "integrators" (
    "integrator_id" UUID NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "phone" BIGINT,
    "is_disabled" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("integrator_id")
);

-- CreateTable
CREATE TABLE "sites" (
    "site_id" UUID NOT NULL,
    "site_name" VARCHAR(255),
    "change_name" VARCHAR(255),
    "group_id" UUID,
    "integrator_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("site_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "group_id" UUID,
    "integrator_id" UUID,
    "user_name" VARCHAR(255),
    "change_name" VARCHAR(255),
    "user_email" VARCHAR(255),
    "is_disabled" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "_camerasTousers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_customersTosites" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_customersTousers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_sitesTousers" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_camerasTousers_AB_unique" ON "_camerasTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_camerasTousers_B_index" ON "_camerasTousers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_customersTosites_AB_unique" ON "_customersTosites"("A", "B");

-- CreateIndex
CREATE INDEX "_customersTosites_B_index" ON "_customersTosites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_customersTousers_AB_unique" ON "_customersTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_customersTousers_B_index" ON "_customersTousers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_sitesTousers_AB_unique" ON "_sitesTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_sitesTousers_B_index" ON "_sitesTousers"("B");

-- AddForeignKey
ALTER TABLE "cameras" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cameras" ADD FOREIGN KEY ("integrator_id") REFERENCES "integrators"("integrator_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cameras" ADD FOREIGN KEY ("site_id") REFERENCES "sites"("site_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD FOREIGN KEY ("integrator_id") REFERENCES "integrators"("integrator_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groups" ADD FOREIGN KEY ("integrator_id") REFERENCES "integrators"("integrator_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sites" ADD FOREIGN KEY ("integrator_id") REFERENCES "integrators"("integrator_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("group_id") REFERENCES "groups"("group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("integrator_id") REFERENCES "integrators"("integrator_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_camerasTousers" ADD FOREIGN KEY ("A") REFERENCES "cameras"("camera_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_camerasTousers" ADD FOREIGN KEY ("B") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_customersTosites" ADD FOREIGN KEY ("A") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_customersTosites" ADD FOREIGN KEY ("B") REFERENCES "sites"("site_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_customersTousers" ADD FOREIGN KEY ("A") REFERENCES "customers"("customer_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_customersTousers" ADD FOREIGN KEY ("B") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sitesTousers" ADD FOREIGN KEY ("A") REFERENCES "sites"("site_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_sitesTousers" ADD FOREIGN KEY ("B") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
