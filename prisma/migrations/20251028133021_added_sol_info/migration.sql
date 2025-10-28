-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "recipientTokenAccount" TEXT,
ADD COLUMN     "txSignature" TEXT;
