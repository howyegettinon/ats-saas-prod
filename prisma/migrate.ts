import { PrismaClient } from '@prisma/client'
import { execSync } from 'child_process'

async function main() {
  const prisma = new PrismaClient()
  try {
    // Check if CoverLetter table exists
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'CoverLetter'
      );
    `

    if (!tableExists) {
      console.log('Creating CoverLetter table...')
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "CoverLetter" (
          "id" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "resume" TEXT NOT NULL,
          "jobDescription" TEXT NOT NULL,
          "coverLetter" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "CoverLetter_pkey" PRIMARY KEY ("id")
        );

        CREATE INDEX IF NOT EXISTS "CoverLetter_userId_idx" ON "CoverLetter"("userId");

        ALTER TABLE "CoverLetter" 
        ADD CONSTRAINT "CoverLetter_userId_fkey" 
        FOREIGN KEY ("userId") 
        REFERENCES "User"("id") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE;
      `
      console.log('CoverLetter table created successfully')
    }
  } catch (error) {
    console.error('Migration error:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
