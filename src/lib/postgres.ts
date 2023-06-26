import { Pool, QueryResult } from 'pg';
const dotenv = require('dotenv');

export class Postgres {
  private pool: Pool;

  constructor() {
    dotenv.config()
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
    });
  }

  async query(sql: string, values: any[] = []): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      return await client.query(sql, values);
    } finally {
      client.release();
    }
  }

  async execute(query: string, queryValue: any[]): Promise<any[]> {
    try{
      const result = await this.query(query, queryValue);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error.message);
    }
    
  }
}
