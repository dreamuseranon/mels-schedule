import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;
function getSql() {
  if (!_sql) _sql = neon(process.env.DATABASE_URL!);
  return _sql;
}

export async function ensureTable() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS dashboard (
      user_id TEXT PRIMARY KEY,
      data    JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
}

export async function loadData(userId: string) {
  await ensureTable();
  const sql = getSql();
  const rows = await sql`SELECT data FROM dashboard WHERE user_id = ${userId}`;
  return rows[0]?.data ?? null;
}

export async function saveData(userId: string, data: unknown) {
  await ensureTable();
  const sql = getSql();
  await sql`
    INSERT INTO dashboard (user_id, data, updated_at)
    VALUES (${userId}, ${JSON.stringify(data)}, now())
    ON CONFLICT (user_id) DO UPDATE
      SET data = EXCLUDED.data,
          updated_at = now()
  `;
}
