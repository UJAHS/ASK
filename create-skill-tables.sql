CREATE TABLE IF NOT EXISTS "Skill" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Skill_name_key"
ON "Skill"("name");

CREATE TABLE IF NOT EXISTS "SkillTranslation" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SkillTranslation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "SkillTranslation_skillId_locale_key"
ON "SkillTranslation"("skillId", "locale");

CREATE INDEX IF NOT EXISTS "SkillTranslation_locale_idx"
ON "SkillTranslation"("locale");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'SkillTranslation_skillId_fkey'
    ) THEN
        ALTER TABLE "SkillTranslation"
        ADD CONSTRAINT "SkillTranslation_skillId_fkey"
        FOREIGN KEY ("skillId")
        REFERENCES "Skill"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    END IF;
END $$;