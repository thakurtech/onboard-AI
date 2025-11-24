import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
    const client = await pool.connect();

    try {
        console.log('🔄 Running database migrations...\n');

        // Create migrations tracking table
        await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) UNIQUE NOT NULL,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Get list of migration files
        const migrationsDir = path.join(__dirname, 'migrations');
        const migrationFiles = fs.readdirSync(migrationsDir)
            .filter(f => f.endsWith('.sql'))
            .sort();

        for (const file of migrationFiles) {
            const migrationName = file.replace('.sql', '');

            // Check if already applied
            const result = await client.query(
                'SELECT * FROM schema_migrations WHERE migration_name = $1',
                [migrationName]
            );

            if (result.rows.length > 0) {
                console.log(`⏭️  Skipping ${migrationName} (already applied)`);
                continue;
            }

            // Read and execute migration
            const filePath = path.join(migrationsDir, file);
            const sql = fs.readFileSync(filePath, 'utf8');

            console.log(`🔧 Applying ${migrationName}...`);
            await client.query(sql);

            // Mark as applied
            await client.query(
                'INSERT INTO schema_migrations (migration_name) VALUES ($1)',
                [migrationName]
            );

            console.log(`✅ ${migrationName} applied successfully\n`);
        }

        console.log('✨ All migrations completed!\n');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

runMigrations()
    .then(() => {
        console.log('Database is up to date!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Migration script failed:', error);
        process.exit(1);
    });
