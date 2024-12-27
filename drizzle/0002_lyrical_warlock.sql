ALTER TABLE "coffee_catalog"."shops" RENAME TO "brands";--> statement-breakpoint
ALTER TABLE "coffee_catalog"."products" RENAME COLUMN "shop_id" TO "brand_id";--> statement-breakpoint
ALTER TABLE "coffee_catalog"."products" DROP CONSTRAINT "products_shop_id_shops_id_fk";
--> statement-breakpoint
ALTER TABLE "coffee_catalog"."products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "coffee_catalog"."brands"("id") ON DELETE cascade ON UPDATE no action;