import { Transaction } from "$postgres/mod.ts";
import { QueryArrayResult } from "$postgres/query/query.ts";

export default interface IPgTable {
  catalog?: string;
  schema?: string;
  name: string;

  create(
    transaction: Transaction,
    dropIfExist: boolean,
  ): Promise<QueryArrayResult<unknown[]>>;
}
