import { HandlerContext } from "$fresh/server.ts";
import config from "@config";
import { pool } from "@db";
import { ITypeColumns, Type } from "@schema/table/type.ts";
import { Group, IGroupColumns } from "@schema/table/group.ts";
import { GroupIdSeq } from "@schema/sequence/group_id_seq.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const client = await pool.connect();
  const transaction = client.createTransaction("init_database");
  await transaction.begin();

  // SCHEMA: xtendise
  await transaction.queryObject(`DROP SCHEMA IF EXISTS xtendise CASCADE; 
    CREATE SCHEMA IF NOT EXISTS xtendise AUTHORIZATION ${config.db.username};`);
  //await transaction.commit({ chain: true });

  //Table: xtendise.type
  const type = new Type();
  await transaction.queryArray(type.createQuery(false));
  // initial load
  const _data: ITypeColumns[] = [
    { id: 1, name: "MAB" },
    { id: 2, name: "GUEST" },
    { id: 3, name: "BYPASS" },
  ];
  await transaction.queryArray<ITypeColumns[]>(
    type.insertQuery(_data, "*"),
  );
  
  // Sequence: xtendise.group_id_seq
  const groupSeq = new GroupIdSeq();
  await transaction.queryArray(groupSeq.createQuery(false));
  
  //Table: xtendise.group
  const group = new Group();
  await transaction.queryArray(group.createQuery(false));

  // initial load
  const groupData: IGroupColumns = { name: "MABg", type_id: 1 };
  const returning = await transaction.queryArray<IGroupColumns[]>(
    group.insertQuery(groupData, "*")
  );

  await transaction.commit();
  client.release();

  //return new Response(null);
  return new Response(JSON.stringify(returning));
};
