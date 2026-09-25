SELECT
    ot."locale",
    length(ot."name") AS name_length,
    encode(convert_to(ot."name", 'UTF8'), 'hex') AS utf8_hex
FROM "OccupationTranslation" ot
JOIN "Occupation" o
    ON o."id" = ot."occupationId"
WHERE o."name" = 'JOB - PRIVATE'
ORDER BY ot."locale";