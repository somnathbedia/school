-- AlterTable
ALTER TABLE "Student" ADD CONSTRAINT "Student_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "request_type" TEXT NOT NULL,
    "request_book" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
