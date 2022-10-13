import IPgObject from "@inf/IPgObject.ts";
import config from "@config";

export interface IGroupColumns {
  id?: number;
  name: string;
  ise_id?: string;
  ise_name?: string;
  description?: string;
  valid_limit?: number;
  sync_datetime?: Date;
  type_id?: number;
}

export class Group extends IPgObject {
  catalog = config.db.database;
  schema = "xtendise";
  objectName = "group";
  objectFullName = `"${this.schema}"."${this.objectName}"`;
  objectFullNamePrefix = `${this.schema}.${this.objectName}`;

  dropStatement = `DROP TABLE IF EXISTS ${this.objectFullName};`;
  createStatement = `CREATE TABLE IF NOT EXISTS ${this.objectFullName}
    (
        id integer NOT NULL DEFAULT nextval('${this.objectFullNamePrefix}_id_seq'::regclass),
        name character varying(100) COLLATE pg_catalog."default" NOT NULL,
        ise_id uuid,
        ise_name character varying(100) COLLATE pg_catalog."default",
        description character varying(200) COLLATE pg_catalog."default",
        valid_limit integer,
        sync_datetime timestamp without time zone,
        type_id integer,
        CONSTRAINT "PK_group" PRIMARY KEY (id),
        CONSTRAINT "UQ_ise_id" UNIQUE (ise_id),
        CONSTRAINT "FK_group_type" FOREIGN KEY (type_id)
            REFERENCES ${this.schema}."type" (id) MATCH SIMPLE
            ON UPDATE NO ACTION
            ON DELETE SET NULL
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS ${this.objectFullName} OWNER to ${config.db.username};`;

  createQuery(dropIfExist: boolean): string {
    return `${dropIfExist ? this.dropStatement : ""} ${this.createStatement}`;
  }

  insertQuery(
    data: IGroupColumns | IGroupColumns[],
    returning?: string,
  ): string {
    const rows: IGroupColumns[] = Array.isArray(data) ? data : [data];
    return `INSERT INTO ${this.objectFullName} (${
      Object.keys(rows[0]).join(", ")
    })
    VALUES
    ${
      rows.map((row) => {
        return `(${
          Object.values(row).map((v) => {
            return typeof v === "string" ? `'${v}'` : v as string;
          }).join(", ")
        })`;
      }).join(", ")
    }
    ${returning === undefined ? "" : `RETURNING ${returning}`};`;
  }
}
