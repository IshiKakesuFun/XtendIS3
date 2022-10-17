import IPgObject from "@inf/IPgObject.ts";
import config from "@config";

export interface ITypeColumns {
  id: number;
  name: string;
}

export class Type extends IPgObject {
  catalog = config.db.database;
  schema = "xtendise";
  objectName = "type";
  objectFullName = `"${this.schema}"."${this.objectName}"`;

  dropStatement = `DROP TABLE IF EXISTS ${this.objectFullName};`;
  createStatement = `CREATE TABLE IF NOT EXISTS ${this.objectFullName}
    (
        id integer NOT NULL,
        name character varying(20) COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT "PK_type" PRIMARY KEY (id),
        CONSTRAINT "UQ_type_name" UNIQUE (name)
    )
    TABLESPACE pg_default;
    ALTER TABLE IF EXISTS ${this.objectFullName} OWNER to ${config.db.username};`;

  createQuery(dropIfExist: boolean): string {
    return `${dropIfExist ? this.dropStatement : ""} ${this.createStatement}`;
  }

  insertQuery(data: ITypeColumns | ITypeColumns[], returning?: string): string {
    const rows: ITypeColumns[] = Array.isArray(data) ? data : [data];
    return `INSERT INTO ${this.objectFullName} (${
      Object.keys(rows[0]).join(", ")
    })
    VALUES
    ${rows.map((row): string => `(${row.id}, '${row.name}')`).join(", ")}
    ${returning === undefined ? "" : `RETURNING ${returning}`};`;
  }
}
