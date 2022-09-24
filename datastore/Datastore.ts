import { ProductDoa } from "./doa/ProductDoa";
import { UserDoa } from "./doa/UserDoa";
import SqlDatastore from "./database/SqlDatastore";
export interface Datastore extends UserDoa, ProductDoa {}

export let db: Datastore;

export async function initDb() {
  db = await new SqlDatastore().openDb();
}
