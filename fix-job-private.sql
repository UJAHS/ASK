UPDATE "OccupationTranslation" ot
SET "name" =
    chr(2344)||chr(2367)||chr(2332)||chr(2368)||' '||
    chr(2344)||chr(2380)||chr(2325)||chr(2352)||chr(2368)
FROM "Occupation" o
WHERE ot."occupationId" = o."id"
  AND o."name" = 'JOB - PRIVATE'
  AND ot."locale" LIKE 'hi%';

UPDATE "OccupationTranslation" ot
SET "name" =
    chr(2710)||chr(2750)||chr(2728)||chr(2711)||chr(2752)||' '||
    chr(2728)||chr(2765)||chr(2695)||chr(2730)||chr(2752)
FROM "Occupation" o
WHERE ot."occupationId" = o."id"
  AND o."name" = 'JOB - PRIVATE'
  AND ot."locale" LIKE 'gu%';