-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "student_name" VARCHAR(100) NOT NULL,
    "father_name" VARCHAR(100) NOT NULL,
    "mother_name" VARCHAR(100) NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "blood_group" CHAR(3) NOT NULL,
    "contact_number" TEXT NOT NULL,
    "email" VARCHAR(25) NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "address" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
