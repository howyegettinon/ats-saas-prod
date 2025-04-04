BEGIN;

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

ALTER TABLE "CoverLetter" ADD COLUMN "coverLetter" TEXT;
UPDATE "CoverLetter" SET "coverLetter" = result;

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

ALTER TABLE "CoverLetter" DROP COLUMN result;
ALTER TABLE "CoverLetter" ALTER COLUMN "coverLetter" SET NOT NULL;

COMMIT;
