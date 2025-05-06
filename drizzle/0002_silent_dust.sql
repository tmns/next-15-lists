ALTER TABLE "items" ALTER COLUMN "publicId" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "lists" ALTER COLUMN "publicId" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "status" varchar(32) DEFAULT 'not_started' NOT NULL;--> statement-breakpoint
ALTER TABLE "items" DROP COLUMN "isChecked";