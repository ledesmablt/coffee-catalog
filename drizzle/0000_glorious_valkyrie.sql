CREATE TABLE "coffee_catalog"."products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "coffee_catalog"."products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp NOT NULL,
	"title" varchar NOT NULL,
	"shop_id" integer NOT NULL,
	"sku" varchar,
	"description" text,
	"specifications" text,
	"image_url" text,
	"ecommerce_url" text
);
--> statement-breakpoint
CREATE TABLE "coffee_catalog"."shops" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "coffee_catalog"."shops_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"shop_url" varchar,
	"description" text,
	"instagram_username" varchar,
	"logo_url" text,
	"logo_background_color" varchar,
	"google_maps_query" text
);
--> statement-breakpoint
ALTER TABLE "coffee_catalog"."products" ADD CONSTRAINT "products_shop_id_shops_id_fk" FOREIGN KEY ("shop_id") REFERENCES "coffee_catalog"."shops"("id") ON DELETE cascade ON UPDATE no action;