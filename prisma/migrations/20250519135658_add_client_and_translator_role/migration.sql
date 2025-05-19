-- CreateTable
CREATE TABLE "TranslatorProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,

    CONSTRAINT "TranslatorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageSkillTranslator" (
    "id" TEXT NOT NULL,
    "translatorId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL,

    CONSTRAINT "LanguageSkillTranslator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,

    CONSTRAINT "ClientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageSkillClient" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL,

    CONSTRAINT "LanguageSkillClient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TranslatorProfile_userId_key" ON "TranslatorProfile"("userId");

-- CreateIndex
CREATE INDEX "LanguageSkillTranslator_translatorId_idx" ON "LanguageSkillTranslator"("translatorId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfile_userId_key" ON "ClientProfile"("userId");

-- CreateIndex
CREATE INDEX "LanguageSkillClient_clientId_idx" ON "LanguageSkillClient"("clientId");

-- AddForeignKey
ALTER TABLE "TranslatorProfile" ADD CONSTRAINT "TranslatorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageSkillTranslator" ADD CONSTRAINT "LanguageSkillTranslator_translatorId_fkey" FOREIGN KEY ("translatorId") REFERENCES "TranslatorProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientProfile" ADD CONSTRAINT "ClientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageSkillClient" ADD CONSTRAINT "LanguageSkillClient_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "ClientProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
