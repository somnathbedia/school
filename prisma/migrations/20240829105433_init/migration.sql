/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Request_id_key";

-- AlterTable
ALTER TABLE "Request" ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Request_studentId_key" ON "Request"("studentId");
