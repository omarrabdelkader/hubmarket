import { User, Product } from "../../models/models";
import { Datastore } from "../Datastore";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";

export default class SqlDatastore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;

  public async openDb(): Promise<this> {
    this.db = await open({
      filename: path.join(__dirname, "hubmart.sqlite"),
      driver: sqlite3.Database,
    });

    await this.db.migrate({
      migrationsPath: path.join(__dirname, "migrations"),
    });

    return this;
  }
  async createUser(user: User): Promise<void> {
    await this.db.run(
      "INSERT INTO users (id, username, firstName, lastName, email, password) VALUES(?, ?, ?,?,?,?)",
      user.id,
      user.username,
      user.firstName,
      user.lastName,
      user.email,
      user.password
    );
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, username);
  }
  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM user WHERE id = ?`, id);
  }
  deleteUsername(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  listProducts(): Promise<Product[]> {
    return this.db.all<Product[]>("SELECT * FROM products");
  }
  async createProduct(product: Product): Promise<void> {
    await this.db.run(
      `INSERT INTO products (id, title, price, receivedAt, company) VALUES(?, ?, ?, ?, ?)`,
      product.id,
      product.title,
      product.price,
      product.receivedAt,
      product.company
    );
  }
  getProductById(id: string): Promise<Product | undefined> {
    throw new Error("Method not implemented.");
  }
  deleteProduct(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
