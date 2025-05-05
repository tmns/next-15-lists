ALTER TABLE "items" ADD COLUMN "publicId" varchar(12) DEFAULT 'cqdi2fub3eu6' NOT NULL;--> statement-breakpoint
ALTER TABLE "lists" ADD COLUMN "publicId" varchar(12) DEFAULT '80acx4vmzrxx' NOT NULL;--> statement-breakpoint
CREATE INDEX "items_public_id_idx" ON "items" USING btree ("publicId");--> statement-breakpoint
CREATE INDEX "lists_public_id_idx" ON "lists" USING btree ("publicId");--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_publicId_unique" UNIQUE("publicId");--> statement-breakpoint
ALTER TABLE "lists" ADD CONSTRAINT "lists_publicId_unique" UNIQUE("publicId");