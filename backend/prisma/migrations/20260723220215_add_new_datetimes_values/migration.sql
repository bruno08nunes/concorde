/*
  Warnings:

  - You are about to drop the column `createdAt` on the `GroupMember` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `FriendshipRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "endedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FriendshipRequest" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "createdAt",
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "leftAt" TIMESTAMP(3);
