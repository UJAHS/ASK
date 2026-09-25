CREATE TABLE IF NOT EXISTS "ProfessionTranslation" (
    "id" TEXT NOT NULL,
    "professionId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "ProfessionTranslation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ProfessionTranslation_professionId_locale_key"
ON "ProfessionTranslation" ("professionId", "locale");

CREATE INDEX IF NOT EXISTS "ProfessionTranslation_locale_idx"
ON "ProfessionTranslation" ("locale");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'ProfessionTranslation_professionId_fkey'
    ) THEN
        ALTER TABLE "ProfessionTranslation"
        ADD CONSTRAINT "ProfessionTranslation_professionId_fkey"
        FOREIGN KEY ("professionId")
        REFERENCES "Profession"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS "BloodGroupTranslation" (
    "id" TEXT NOT NULL,
    "bloodGroupId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "BloodGroupTranslation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "BloodGroupTranslation_bloodGroupId_locale_key"
ON "BloodGroupTranslation" ("bloodGroupId", "locale");

CREATE INDEX IF NOT EXISTS "BloodGroupTranslation_locale_idx"
ON "BloodGroupTranslation" ("locale");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'BloodGroupTranslation_bloodGroupId_fkey'
    ) THEN
        ALTER TABLE "BloodGroupTranslation"
        ADD CONSTRAINT "BloodGroupTranslation_bloodGroupId_fkey"
        FOREIGN KEY ("bloodGroupId")
        REFERENCES "BloodGroup"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    END IF;
END
$$;

CREATE TABLE IF NOT EXISTS "BusinessCategoryTranslation" (
    "id" TEXT NOT NULL,
    "businessCategoryId" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "BusinessCategoryTranslation_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "BusinessCategoryTranslation_businessCategoryId_locale_key"
ON "BusinessCategoryTranslation" ("businessCategoryId", "locale");

CREATE INDEX IF NOT EXISTS "BusinessCategoryTranslation_locale_idx"
ON "BusinessCategoryTranslation" ("locale");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'BusinessCategoryTranslation_businessCategoryId_fkey'
    ) THEN
        ALTER TABLE "BusinessCategoryTranslation"
        ADD CONSTRAINT "BusinessCategoryTranslation_businessCategoryId_fkey"
        FOREIGN KEY ("businessCategoryId")
        REFERENCES "BusinessCategory"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    END IF;
END
$$;