import IPgObject from "@inf/IPgObject.ts";
import config from "@config";

export class GroupIdSeq extends IPgObject {
  catalog = config.db.database;
  schema = "xtendise";
  objectName = "group_id_seq";
  objectFullName = `${this.schema}.${this.objectName}`;
  objectFullNamePrefix = `${this.schema}.${this.objectName}`;

  dropStatement = `DROP SEQUENCE IF EXISTS ${this.objectFullName};`;
  createStatement = `CREATE SEQUENCE IF NOT EXISTS ${this.objectFullName}
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;
    ALTER SEQUENCE IF EXISTS ${this.objectFullName} OWNER TO ${config.db.username};`;

  createQuery(dropIfExist: boolean): string {
    return `${dropIfExist ? this.dropStatement : ""} ${this.createStatement}`;
  }
}
