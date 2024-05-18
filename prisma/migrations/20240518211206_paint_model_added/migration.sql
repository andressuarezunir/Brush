-- CreateTable
CREATE TABLE "Paint" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR NOT NULL,
    "image" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "on_sale" BOOLEAN NOT NULL DEFAULT false,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_finish" TIMESTAMP(3) NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaintCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "PaintCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnPaint" (
    "paint_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "CategoriesOnPaint_pkey" PRIMARY KEY ("paint_id","category_id")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnPaint" ADD CONSTRAINT "CategoriesOnPaint_paint_id_fkey" FOREIGN KEY ("paint_id") REFERENCES "Paint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnPaint" ADD CONSTRAINT "CategoriesOnPaint_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "PaintCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
