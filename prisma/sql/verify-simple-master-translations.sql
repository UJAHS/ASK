SELECT 'Profession' AS "Master", COUNT(*) AS "Translations"
FROM "ProfessionTranslation"
WHERE "locale" = 'en'

UNION ALL

SELECT 'BloodGroup', COUNT(*)
FROM "BloodGroupTranslation"
WHERE "locale" = 'en'

UNION ALL

SELECT 'BusinessCategory', COUNT(*)
FROM "BusinessCategoryTranslation"
WHERE "locale" = 'en';