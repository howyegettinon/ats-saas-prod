-- AlterTable: Safe addition of CoverLetter table
CREATE TABLE IF NOT EXISTS "CoverLetter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "coverLetter" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CoverLetter_pkey" PRIMARY KEY ("id")
);

-- Add index if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE tablename = 'CoverLetter' 
        AND indexname = 'CoverLetter_userId_idx'
    ) THEN
        CREATE INDEX "CoverLetter_userId_idx" ON "CoverLetter"("userId");
    END IF;
END $$;

-- Add foreign key if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'CoverLetter_userId_fkey'
    ) THEN
        ALTER TABLE "CoverLetter" 
        ADD CONSTRAINT "CoverLetter_userId_fkey" 
        FOREIGN KEY ("userId") 
        REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
