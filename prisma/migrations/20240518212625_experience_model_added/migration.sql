-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "ExperienceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnExperience" (
    "experience_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnExperience_pkey" PRIMARY KEY ("experience_id","category_id")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnExperience" ADD CONSTRAINT "CategoriesOnExperience_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnExperience" ADD CONSTRAINT "CategoriesOnExperience_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ExperienceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
