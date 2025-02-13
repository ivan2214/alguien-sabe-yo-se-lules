/*
  Warnings:

  - You are about to drop the column `count` on the `Reaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "reactionCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "reactionCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "count";
