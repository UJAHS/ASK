INSERT INTO "ProfessionTranslation" ("id", "professionId", "locale", "name")
SELECT
    'profession-' || p."id",
    p."id",
    'en',
    p."name"
FROM "Profession" p
WHERE NOT EXISTS (
    SELECT 1
    FROM "ProfessionTranslation" t
    WHERE t."professionId" = p."id"
      AND t."locale" = 'en'
);

INSERT INTO "BloodGroupTranslation" ("id", "bloodGroupId", "locale", "name")
SELECT
    'bloodgroup-' || b."id",
    b."id",
    'en',
    b."name"
FROM "BloodGroup" b
WHERE NOT EXISTS (
    SELECT 1
    FROM "BloodGroupTranslation" t
    WHERE t."bloodGroupId" = b."id"
      AND t."locale" = 'en'
);

INSERT INTO "BusinessCategoryTranslation" ("id", "businessCategoryId", "locale", "name")
SELECT
    'businesscategory-' || b."id",
    b."id",
    'en',
    b."name"
FROM "BusinessCategory" b
WHERE NOT EXISTS (
    SELECT 1
    FROM "BusinessCategoryTranslation" t
    WHERE t."businessCategoryId" = b."id"
      AND t."locale" = 'en'
);
