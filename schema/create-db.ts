import config from "@config";
import { pool } from "@db";

const client = await pool.connect();

const transaction = client.createTransaction("init_database");

await transaction.begin();

// SCHEMA: xtendise
await transaction.queryArray`-- DROP SCHEMA IF EXISTS xtendise 
CREATE SCHEMA IF NOT EXISTS xtendise
    AUTHORIZATION ${config.db.username};`;

// Table: xtendise.type
await transaction.queryArray`-- DROP TABLE IF EXISTS xtendise.type;
CREATE TABLE IF NOT EXISTS xtendise.type
(
    id integer NOT NULL,
    name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "PK_type" PRIMARY KEY (id),
    CONSTRAINT "UQ_type_name" UNIQUE (name)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.type
    OWNER to ${config.db.username};`;

await transaction.commit();

client.release();
