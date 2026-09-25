-- ASK Community Portal: Indian State master data
-- 28 Indian States with EN / HI / GU translations
-- Safe to run repeatedly.

BEGIN;

DO $$
DECLARE
  india_id TEXT;
  state_id TEXT;
BEGIN
  SELECT "id" INTO india_id FROM "Country" WHERE UPPER("name") = 'INDIA' LIMIT 1;
  IF india_id IS NULL THEN
    RAISE EXCEPTION 'Country INDIA not found in Country table.';
  END IF;

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt")
  VALUES (md5(random()::text || clock_timestamp()::text), 'ANDHRA PRADESH', india_id, TRUE, NOW(), NOW())
  ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'ANDHRA PRADESH' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'ANDHRA PRADESH') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'आंध्र प्रदेश') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'આંધ્ર પ્રદેશ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'ARUNACHAL PRADESH', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'ARUNACHAL PRADESH' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'ARUNACHAL PRADESH') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'अरुणाचल प्रदेश') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'અરુણાચલ પ્રદેશ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'ASSAM', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'ASSAM' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'ASSAM') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'असम') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'આસામ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'BIHAR', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'BIHAR' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'BIHAR') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'बिहार') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'બિહાર') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'CHHATTISGARH', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'CHHATTISGARH' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'CHHATTISGARH') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'छत्तीसगढ़') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'છત્તીસગઢ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'GOA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'GOA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'GOA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'गोवा') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'ગોવા') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'GUJARAT', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'GUJARAT' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'GUJARAT') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'गुजरात') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'ગુજરાત') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'HARYANA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'HARYANA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'HARYANA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'हरियाणा') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'હરિયાણા') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'HIMACHAL PRADESH', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'HIMACHAL PRADESH' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'HIMACHAL PRADESH') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'हिमाचल प्रदेश') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'હિમાચલ પ્રદેશ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'JHARKHAND', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'JHARKHAND' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'JHARKHAND') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'झारखंड') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'ઝારખંડ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'KARNATAKA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'KARNATAKA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'KARNATAKA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'कर्नाटक') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'કર્ણાટક') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'KERALA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'KERALA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'KERALA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'केरल') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'કેરળ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'MADHYA PRADESH', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'MADHYA PRADESH' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'MADHYA PRADESH') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'मध्य प्रदेश') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'મધ્ય પ્રદેશ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'MAHARASHTRA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'MAHARASHTRA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'MAHARASHTRA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'महाराष्ट्र') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'મહારાષ્ટ્ર') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'MANIPUR', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'MANIPUR' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'MANIPUR') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'मणिपुर') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'મણિપુર') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'MEGHALAYA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'MEGHALAYA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'MEGHALAYA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'मेघालय') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'મેઘાલય') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'MIZORAM', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'MIZORAM' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'MIZORAM') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'मिज़ोरम') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'મિઝોરમ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'NAGALAND', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'NAGALAND' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'NAGALAND') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'नागालैंड') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'નાગાલેન્ડ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'ODISHA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'ODISHA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'ODISHA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'ओडिशा') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'ઓડિશા') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'PUNJAB', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'PUNJAB' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'PUNJAB') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'पंजाब') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'પંજાબ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'RAJASTHAN', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'RAJASTHAN' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'RAJASTHAN') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'राजस्थान') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'રાજસ્થાન') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'SIKKIM', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'SIKKIM' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'SIKKIM') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'सिक्किम') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'સિક્કિમ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'TAMIL NADU', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'TAMIL NADU' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'TAMIL NADU') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'तमिलनाडु') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'તમિલનાડુ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'TELANGANA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'TELANGANA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'TELANGANA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'तेलंगाना') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'તેલંગાણા') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'TRIPURA', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'TRIPURA' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'TRIPURA') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'त्रिपुरा') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'ત્રિપુરા') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'UTTAR PRADESH', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'UTTAR PRADESH' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'UTTAR PRADESH') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'उत्तर प्रदेश') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'ઉત્તર પ્રદેશ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'UTTARAKHAND', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'UTTARAKHAND' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'UTTARAKHAND') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'उत्तराखंड') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'ઉત્તરાખંડ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";

  INSERT INTO "State" ("id","name","countryId","isActive","createdAt","updatedAt") VALUES (md5(random()::text || clock_timestamp()::text), 'WEST BENGAL', india_id, TRUE, NOW(), NOW()) ON CONFLICT ("name") DO UPDATE SET "countryId" = EXCLUDED."countryId";
  SELECT "id" INTO state_id FROM "State" WHERE "name" = 'WEST BENGAL' LIMIT 1;
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'en', 'WEST BENGAL') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'hi', 'पश्चिम बंगाल') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
  INSERT INTO "StateTranslation" ("id","stateId","locale","name") VALUES (md5(random()::text || clock_timestamp()::text), state_id, 'gu', 'પશ્ચિમ બંગાળ') ON CONFLICT ("stateId","locale") DO UPDATE SET "name" = EXCLUDED."name";
END $$;

COMMIT;
