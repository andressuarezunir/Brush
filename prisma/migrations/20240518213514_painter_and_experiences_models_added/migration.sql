-- CreateTable
CREATE TABLE "Painter" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "image" VARCHAR NOT NULL,
    "welcome_message" VARCHAR(200) NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "Painter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(50) NOT NULL,
    "subtitle" VARCHAR(50) NOT NULL,
    "description" VARCHAR(300) NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_finish" TIMESTAMP(3) NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "StudyCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Painter_id_key" ON "Painter"("id");

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "StudyCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
