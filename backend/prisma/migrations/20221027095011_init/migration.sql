-- CreateTable
CREATE TABLE "Test" (
    "name" TEXT NOT NULL,
    "error" VARCHAR(1000),
    "basePath" VARCHAR(2048) NOT NULL,
    "imagePath" VARCHAR(2048) NOT NULL,
    "imagesFolder" VARCHAR(100) NOT NULL,
    "diffPath" VARCHAR(2048) NOT NULL,
    "lastImagePath" VARCHAR(2048) NOT NULL,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "pending" BOOLEAN NOT NULL DEFAULT false,
    "hasDiff" BOOLEAN NOT NULL DEFAULT false,
    "notified" BOOLEAN NOT NULL DEFAULT true,
    "needsLogin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" SERIAL NOT NULL,
    "testId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "args" JSONB NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
