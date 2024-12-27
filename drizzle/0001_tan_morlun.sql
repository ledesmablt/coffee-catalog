ALTER TABLE "coffee_catalog"."products" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "coffee_catalog"."shops" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "coffee_catalog"."products" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_catalog"."shops" ADD COLUMN "updated_at" timestamp NOT NULL;