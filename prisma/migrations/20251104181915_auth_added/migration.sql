-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "emailOtp" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);
