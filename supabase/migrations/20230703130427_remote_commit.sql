
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."branch" (
    "key" integer NOT NULL,
    "opendata_id" "text",
    "created_on" "date",
    "ihk_branch_id" integer
);

ALTER TABLE "public"."branch" OWNER TO "postgres";

CREATE SEQUENCE "public"."branch_key_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."branch_key_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."branch_key_seq" OWNED BY "public"."branch"."key";

CREATE TABLE "public"."branch_names" (
    "key" integer NOT NULL,
    "ihk_branch_id" integer,
    "ihk_branch_desc" "text",
    "nace_id" integer,
    "nace_desc" "text",
    "branch_top_level_id" integer,
    "branch_top_level_desc" "text"
);

ALTER TABLE "public"."branch_names" OWNER TO "postgres";

CREATE SEQUENCE "public"."branch_names_key_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."branch_names_key_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."branch_names_key_seq" OWNED BY "public"."branch_names"."key";

CREATE TABLE "public"."business" (
    "key" integer NOT NULL,
    "opendata_id" "text",
    "business_type" integer,
    "created_on" "date",
    "updated_on" "date",
    "business_age" integer
);

ALTER TABLE "public"."business" OWNER TO "postgres";

CREATE SEQUENCE "public"."business_key_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."business_key_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."business_key_seq" OWNED BY "public"."business"."key";

CREATE TABLE "public"."employees" (
    "key" integer NOT NULL,
    "opendata_id" "text",
    "created_on" "date",
    "employees_range" "text"
);

ALTER TABLE "public"."employees" OWNER TO "postgres";

CREATE SEQUENCE "public"."employees_key_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."employees_key_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."employees_key_seq" OWNED BY "public"."employees"."key";

CREATE TABLE "public"."location" (
    "key" integer NOT NULL,
    "opendata_id" "text",
    "created_on" "date",
    "latitude" numeric,
    "longitude" numeric,
    "postcode" integer,
    "bezirk" "text",
    "planungsraum" "text",
    "bezirksregion" "text",
    "prognoseraum" "text",
    "ortsteil" "text"
);

ALTER TABLE "public"."location" OWNER TO "postgres";

CREATE SEQUENCE "public"."location_key_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."location_key_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."location_key_seq" OWNED BY "public"."location"."key";

CREATE TABLE "public"."lookup_business" (
    "key" integer NOT NULL,
    "id" integer,
    "description" "text"
);

ALTER TABLE "public"."lookup_business" OWNER TO "postgres";

CREATE SEQUENCE "public"."lookup_business_key_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."lookup_business_key_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."lookup_business_key_seq" OWNED BY "public"."lookup_business"."key";

CREATE TABLE "public"."lookup_employees" (
    "key" integer NOT NULL,
    "id" integer,
    "description" "text"
);

ALTER TABLE "public"."lookup_employees" OWNER TO "postgres";

CREATE SEQUENCE "public"."lookup_employees_key_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."lookup_employees_key_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."lookup_employees_key_seq" OWNED BY "public"."lookup_employees"."key";

CREATE TABLE "public"."state_03_2023" (
    "opendata_id" "text",
    "business_type" integer,
    "business_age" integer,
    "employees_range" "text",
    "latitude" numeric,
    "longitude" numeric,
    "postcode" integer,
    "ihk_branch_id" integer,
    "nace_id" integer,
    "branch_top_level_id" integer,
    "created_on" "date"
);

ALTER TABLE "public"."state_03_2023" OWNER TO "postgres";

CREATE TABLE "public"."state_04_2023" (
    "opendata_id" "text",
    "business_type" integer,
    "business_age" integer,
    "employees_range" "text",
    "latitude" numeric,
    "longitude" numeric,
    "postcode" integer,
    "ihk_branch_id" integer,
    "nace_id" integer,
    "branch_top_level_id" integer,
    "created_on" "date"
);

ALTER TABLE "public"."state_04_2023" OWNER TO "postgres";

CREATE TABLE "public"."state_05_2023" (
    "opendata_id" "text",
    "business_type" integer,
    "business_age" integer,
    "employees_range" "text",
    "latitude" numeric,
    "longitude" numeric,
    "postcode" integer,
    "ihk_branch_id" integer,
    "nace_id" integer,
    "branch_top_level_id" integer,
    "created_on" "date"
);

ALTER TABLE "public"."state_05_2023" OWNER TO "postgres";

CREATE TABLE "public"."state_06_2023" (
    "opendata_id" "text",
    "business_type" integer,
    "business_age" integer,
    "employees_range" "text",
    "latitude" numeric,
    "longitude" numeric,
    "postcode" integer,
    "ihk_branch_id" integer,
    "nace_id" integer,
    "branch_top_level_id" integer,
    "created_on" "date"
);

ALTER TABLE "public"."state_06_2023" OWNER TO "postgres";

ALTER TABLE ONLY "public"."branch" ALTER COLUMN "key" SET DEFAULT "nextval"('"public"."branch_key_seq"'::"regclass");

ALTER TABLE ONLY "public"."branch_names" ALTER COLUMN "key" SET DEFAULT "nextval"('"public"."branch_names_key_seq"'::"regclass");

ALTER TABLE ONLY "public"."business" ALTER COLUMN "key" SET DEFAULT "nextval"('"public"."business_key_seq"'::"regclass");

ALTER TABLE ONLY "public"."employees" ALTER COLUMN "key" SET DEFAULT "nextval"('"public"."employees_key_seq"'::"regclass");

ALTER TABLE ONLY "public"."location" ALTER COLUMN "key" SET DEFAULT "nextval"('"public"."location_key_seq"'::"regclass");

ALTER TABLE ONLY "public"."lookup_business" ALTER COLUMN "key" SET DEFAULT "nextval"('"public"."lookup_business_key_seq"'::"regclass");

ALTER TABLE ONLY "public"."lookup_employees" ALTER COLUMN "key" SET DEFAULT "nextval"('"public"."lookup_employees_key_seq"'::"regclass");

ALTER TABLE ONLY "public"."branch_names"
    ADD CONSTRAINT "branch_names_ihk_branch_id_key" UNIQUE ("ihk_branch_id");

ALTER TABLE ONLY "public"."branch_names"
    ADD CONSTRAINT "branch_names_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."branch"
    ADD CONSTRAINT "branch_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."business"
    ADD CONSTRAINT "business_opendata_id_key" UNIQUE ("opendata_id");

ALTER TABLE ONLY "public"."business"
    ADD CONSTRAINT "business_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."employees"
    ADD CONSTRAINT "employees_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."location"
    ADD CONSTRAINT "location_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."lookup_business"
    ADD CONSTRAINT "lookup_business_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."lookup_business"
    ADD CONSTRAINT "lookup_business_pkey" PRIMARY KEY ("key");

ALTER TABLE ONLY "public"."lookup_employees"
    ADD CONSTRAINT "lookup_employees_id_key" UNIQUE ("id");

ALTER TABLE ONLY "public"."lookup_employees"
    ADD CONSTRAINT "lookup_employees_pkey" PRIMARY KEY ("key");

CREATE INDEX "branch_index" ON "public"."branch" USING "btree" ("opendata_id");

CREATE INDEX "branch_top_level_id" ON "public"."location" USING "btree" ("opendata_id");

CREATE INDEX "branch_top_level_id_index" ON "public"."state_05_2023" USING "btree" ("branch_top_level_id");

CREATE INDEX "business_age_index" ON "public"."state_05_2023" USING "btree" ("business_age");

CREATE INDEX "business_index" ON "public"."business" USING "btree" ("opendata_id");

CREATE INDEX "business_type_index" ON "public"."state_05_2023" USING "btree" ("business_type");

CREATE INDEX "created_on_index" ON "public"."state_05_2023" USING "btree" ("created_on");

CREATE INDEX "employees_index" ON "public"."employees" USING "btree" ("opendata_id");

CREATE INDEX "employees_range_index" ON "public"."state_05_2023" USING "btree" ("employees_range");

CREATE INDEX "ihk_branch_id_index" ON "public"."state_05_2023" USING "btree" ("ihk_branch_id");

CREATE INDEX "latitude_index" ON "public"."state_05_2023" USING "btree" ("latitude");

CREATE INDEX "location_index" ON "public"."location" USING "btree" ("opendata_id");

CREATE INDEX "longitude_index" ON "public"."state_05_2023" USING "btree" ("longitude");

CREATE INDEX "nace_id_index" ON "public"."state_05_2023" USING "btree" ("nace_id");

CREATE INDEX "opendata_id_index" ON "public"."state_05_2023" USING "btree" ("opendata_id");

CREATE INDEX "postcode_index" ON "public"."state_05_2023" USING "btree" ("postcode");

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."branch" TO "anon";
GRANT ALL ON TABLE "public"."branch" TO "authenticated";
GRANT ALL ON TABLE "public"."branch" TO "service_role";

GRANT ALL ON SEQUENCE "public"."branch_key_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."branch_key_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."branch_key_seq" TO "service_role";

GRANT ALL ON TABLE "public"."branch_names" TO "anon";
GRANT ALL ON TABLE "public"."branch_names" TO "authenticated";
GRANT ALL ON TABLE "public"."branch_names" TO "service_role";

GRANT ALL ON SEQUENCE "public"."branch_names_key_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."branch_names_key_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."branch_names_key_seq" TO "service_role";

GRANT ALL ON TABLE "public"."business" TO "anon";
GRANT ALL ON TABLE "public"."business" TO "authenticated";
GRANT ALL ON TABLE "public"."business" TO "service_role";

GRANT ALL ON SEQUENCE "public"."business_key_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."business_key_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."business_key_seq" TO "service_role";

GRANT ALL ON TABLE "public"."employees" TO "anon";
GRANT ALL ON TABLE "public"."employees" TO "authenticated";
GRANT ALL ON TABLE "public"."employees" TO "service_role";

GRANT ALL ON SEQUENCE "public"."employees_key_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."employees_key_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."employees_key_seq" TO "service_role";

GRANT ALL ON TABLE "public"."location" TO "anon";
GRANT ALL ON TABLE "public"."location" TO "authenticated";
GRANT ALL ON TABLE "public"."location" TO "service_role";

GRANT ALL ON SEQUENCE "public"."location_key_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."location_key_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."location_key_seq" TO "service_role";

GRANT ALL ON TABLE "public"."lookup_business" TO "anon";
GRANT ALL ON TABLE "public"."lookup_business" TO "authenticated";
GRANT ALL ON TABLE "public"."lookup_business" TO "service_role";

GRANT ALL ON SEQUENCE "public"."lookup_business_key_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."lookup_business_key_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."lookup_business_key_seq" TO "service_role";

GRANT ALL ON TABLE "public"."lookup_employees" TO "anon";
GRANT ALL ON TABLE "public"."lookup_employees" TO "authenticated";
GRANT ALL ON TABLE "public"."lookup_employees" TO "service_role";

GRANT ALL ON SEQUENCE "public"."lookup_employees_key_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."lookup_employees_key_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."lookup_employees_key_seq" TO "service_role";

GRANT ALL ON TABLE "public"."state_03_2023" TO "anon";
GRANT ALL ON TABLE "public"."state_03_2023" TO "authenticated";
GRANT ALL ON TABLE "public"."state_03_2023" TO "service_role";

GRANT ALL ON TABLE "public"."state_04_2023" TO "anon";
GRANT ALL ON TABLE "public"."state_04_2023" TO "authenticated";
GRANT ALL ON TABLE "public"."state_04_2023" TO "service_role";

GRANT ALL ON TABLE "public"."state_05_2023" TO "anon";
GRANT ALL ON TABLE "public"."state_05_2023" TO "authenticated";
GRANT ALL ON TABLE "public"."state_05_2023" TO "service_role";

GRANT ALL ON TABLE "public"."state_06_2023" TO "anon";
GRANT ALL ON TABLE "public"."state_06_2023" TO "authenticated";
GRANT ALL ON TABLE "public"."state_06_2023" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
