PRAGMA foreign_keys=OFF;

CREATE TABLE "Prompt_new" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "userId" INTEGER NOT NULL,
  "styleName" TEXT NOT NULL,
  "goldCombo" TEXT NOT NULL DEFAULT 'YELLOW_WHITE',
  "emblem" TEXT NOT NULL DEFAULT 'NONE',
  "jsonOverrides" TEXT NOT NULL DEFAULT '{}',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Prompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "Prompt_new" ("id", "userId", "styleName", "goldCombo", "emblem", "jsonOverrides", "createdAt")
SELECT
  "id",
  "userId",
  "styleName",
  CASE
    WHEN "twoTone" = 1 AND "primaryColor" = 'YELLOW_GOLD' AND COALESCE("secondaryColor", '') = 'WHITE_GOLD' THEN 'YELLOW_WHITE'
    WHEN "twoTone" = 1 AND "primaryColor" = 'ROSE_GOLD'   AND COALESCE("secondaryColor", '') = 'WHITE_GOLD' THEN 'ROSE_WHITE'
    WHEN "primaryColor" = 'WHITE_GOLD' THEN 'WHITE'
    ELSE 'YELLOW_WHITE'
  END,
  "emblem",
  "jsonOverrides",
  "createdAt"
FROM "Prompt";

DROP TABLE "Prompt";
ALTER TABLE "Prompt_new" RENAME TO "Prompt";

CREATE INDEX "Prompt_user_created_idx" ON "Prompt"("userId", "createdAt");

PRAGMA foreign_keys=ON;
