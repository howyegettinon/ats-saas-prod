-- 1. Begin transaction
BEGIN;

-- 2. Verify table exists and has expected structure
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'CoverLetter' 
        AND column_name = 'result'
    ) THEN
        RAISE EXCEPTION 'Safety check failed: result column not found';
    END IF;
END $$;

-- 3. Create new column and copy data
ALTER TABLE "CoverLetter" ADD COLUMN "coverLetter" TEXT;
UPDATE "CoverLetter" SET "coverLetter" = result;

-- 4. Verify data copy
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM "CoverLetter" 
        WHERE "coverLetter" IS NULL AND result IS NOT NULL
    ) THEN
        RAISE EXCEPTION 'Data copy verification failed';
    END IF;
END $$;

-- 5. Drop old column
ALTER TABLE "CoverLetter" DROP COLUMN result;

-- 6. Add NOT NULL constraint
ALTER TABLE "CoverLetter" ALTER COLUMN "coverLetter" SET NOT NULL;

COMMIT;
