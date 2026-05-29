-- VoxenSMP website login bridge.
-- The Minecraft server/plugin should create one-time tokens in this table after a player runs an in-game command.
-- The website consumes the token, verifies that the username exists in luckperms_players, and syncs rank from LuckPerms.

CREATE TABLE IF NOT EXISTS voxensmp_login_tokens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(16) NOT NULL,
  token CHAR(64) NOT NULL COMMENT 'SHA2(one_time_code, 256)',
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_voxensmp_login_lookup (username, token, used_at, expires_at)
);

-- Optional profile stats table. Set PLAYER_STATS_TABLE=voxensmp_player_stats if this exists.
CREATE TABLE IF NOT EXISTS voxensmp_player_stats (
  uuid VARCHAR(36) NOT NULL PRIMARY KEY,
  balance DECIMAL(18, 2) NULL,
  playtime BIGINT NULL COMMENT 'Store playtime in seconds or your plugin-specific unit.'
);
