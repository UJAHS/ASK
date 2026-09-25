CREATE TABLE IF NOT EXISTS "StateTranslation" (
  "id" TEXT NOT NULL,
  "stateId" TEXT NOT NULL,
  "locale" TEXT NOT NULL,
  "name" TEXT NOT NULL,

  CONSTRAINT "StateTranslation_pkey"
    PRIMARY KEY ("id"),

  CONSTRAINT "StateTranslation_stateId_fkey"
    FOREIGN KEY ("stateId")
    REFERENCES "State"("id")
    ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "StateTranslation_stateId_locale_key"
  ON "StateTranslation"("stateId", "locale");

CREATE INDEX IF NOT EXISTS "StateTranslation_locale_idx"
  ON "StateTranslation"("locale");
