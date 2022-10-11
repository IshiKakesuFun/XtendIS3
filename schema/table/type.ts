import { Transaction } from "$postgres/mod.ts";
import IPgTable from "@inf/IPgTable.ts";
import config from "@config";
import { QueryArrayResult } from "$postgres/query/query.ts";

export interface ITypeColumns {
  id: number;
  name: string;
}

export class Type implements IPgTable {
  catalog = config.db.database;
  schema = "public";
  name = "type";
  async create(
    transaction: Transaction,
    dropIfExist: boolean,
  ): Promise<QueryArrayResult<unknown[]>> {
    const _object = `${this.schema}.${this.name}`;
    return await transaction.queryArray`${
      dropIfExist ? "" : "--"
    } DROP TABLE IF EXISTS ${_object};
        CREATE TABLE IF NOT EXISTS ${_object}
        (
            id integer NOT NULL,
            name character varying(20) COLLATE pg_catalog."default" NOT NULL,
            CONSTRAINT "PK_type" PRIMARY KEY (id),
            CONSTRAINT "UQ_type_name" UNIQUE (name)
        )
        TABLESPACE pg_default;

        ALTER TABLE IF EXISTS ${_object}
        OWNER to ${config.db.username};`;
  }
}
