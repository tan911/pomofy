-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Todo', 'Inprogress', 'Completed');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('High', 'Normal', 'Low');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "task_due_date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Todo',
    "priority" "Priority" NOT NULL DEFAULT 'Normal',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
