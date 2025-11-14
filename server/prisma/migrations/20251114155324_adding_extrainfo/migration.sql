-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_verified_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "user_extra_info" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "bio" TEXT,
    "location" TEXT,
    "primary_goals" TEXT[],
    "experience_level" TEXT,
    "areas_of_interest" TEXT[],
    "dedication_hours_per_week" INTEGER,
    "current_role" TEXT,
    "primary_programming_language" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_extra_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_info" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "twitter" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "instagram" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_extra_info_user_id_key" ON "user_extra_info"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "social_info_user_id_key" ON "social_info"("user_id");

-- AddForeignKey
ALTER TABLE "user_extra_info" ADD CONSTRAINT "user_extra_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_info" ADD CONSTRAINT "social_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
