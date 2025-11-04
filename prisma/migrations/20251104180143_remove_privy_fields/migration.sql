/*
  Warnings:

  - You are about to drop the column `privyId` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."User_privyId_key";

-- AlterTable: First add password column with a default value for existing users
ALTER TABLE "public"."User" DROP COLUMN "privyId",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'temp_password_needs_reset',
ALTER COLUMN "email" SET NOT NULL;
