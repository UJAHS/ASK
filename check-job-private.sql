SELECT
    o."name" AS occupation,
    ot."locale",
    ot."name" AS translation
FROM "Occupation" o
JOIN "OccupationTranslation" ot
    ON ot."occupationId" = o."id"
WHERE o."name" = 'JOB - PRIVATE'
ORDER BY ot."locale";