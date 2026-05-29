type Row = Record<string, unknown>;
type MysqlPool = {
  execute<T = Row[]>(query: string, values?: Record<string, unknown>): Promise<[T, unknown]>;
};

let pool: MysqlPool | undefined;

async function importMysql() {
  const dynamicImport = new Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<{
    default: { createPool(config: Record<string, unknown>): MysqlPool };
  }>;
  return dynamicImport('mysql2/promise');
}

export async function getPool() {
  if (!process.env.MYSQL_DATABASE_URL) {
    throw new Error('MYSQL_DATABASE_URL is not configured.');
  }

  if (!pool) {
    const mysql = await importMysql();
    pool = mysql.default.createPool({
      uri: process.env.MYSQL_DATABASE_URL,
      connectionLimit: 4,
      namedPlaceholders: true,
      ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
    });
  }

  return pool;
}

export type LuckPermsPlayer = {
  uuid: string;
  username: string;
  primary_group?: string | null;
};

export async function findLuckPermsPlayer(username: string) {
  const db = await getPool();
  const [rows] = await db.execute<Row[]>(
    `SELECT uuid, username, primary_group
     FROM luckperms_players
     WHERE LOWER(username) = LOWER(:username)
     LIMIT 1`,
    { username },
  );

  return rows[0] as LuckPermsPlayer | undefined;
}

export async function findLuckPermsRank(uuid: string, fallback?: string | null) {
  const db = await getPool();
  const [rows] = await db.execute<Row[]>(
    `SELECT permission
     FROM luckperms_user_permissions
     WHERE uuid = :uuid
       AND permission LIKE 'group.%'
       AND value = 1
     ORDER BY expiry DESC, permission ASC
     LIMIT 1`,
    { uuid },
  );

  const permission = rows[0]?.permission as string | undefined;
  return permission?.replace(/^group\./, '') ?? fallback ?? 'default';
}

export async function consumeLoginCode(username: string, code: string) {
  const db = await getPool();
  const [rows] = await db.execute<Row[]>(
    `SELECT id
     FROM voxensmp_login_tokens
     WHERE LOWER(username) = LOWER(:username)
       AND token = SHA2(:code, 256)
       AND used_at IS NULL
       AND expires_at > NOW()
     LIMIT 1`,
    { username, code },
  );

  const id = rows[0]?.id as number | undefined;
  if (!id) return false;

  await db.execute(
    `UPDATE voxensmp_login_tokens SET used_at = NOW() WHERE id = :id`,
    { id },
  );

  return true;
}

export async function findOptionalPlayerStats(uuid: string) {
  const statsTable = process.env.PLAYER_STATS_TABLE;
  if (!statsTable || !/^[a-zA-Z0-9_]+$/.test(statsTable)) {
    return { balance: null, playtime: null };
  }

  const db = await getPool();
  const [rows] = await db.execute<Row[]>(
    `SELECT balance, playtime FROM ${statsTable} WHERE uuid = :uuid LIMIT 1`,
    { uuid },
  );

  const balance = rows[0]?.balance;
  const playtime = rows[0]?.playtime;

  return {
    balance: balance === undefined || balance === null ? null : Number(balance),
    playtime: playtime === undefined || playtime === null ? null : Number(playtime),
  };
}
