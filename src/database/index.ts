import Env from '../utils/env';
import oracledb, { BindParameters } from "oracledb";

interface OracleConnectionProps  {
    user: string;
    password: string;
    connectionString: string;
    libDir: string;
};

export class OracleConnection {
    
    private getStringConnection(): OracleConnectionProps {
        const user = Env.get('ORACLE_USER') as string;
        const password = Env.get('ORACLE_PASSWORD') as string;
        const connectionString = Env.get('ORACLE_CONNECTION') as string;
        const libDir = Env.get('ORACLE_LIBDIR') as string;

        return {
            user,
            password,
            connectionString,
            libDir
        };
    };

    public async init() {
        const { libDir } = this.getStringConnection();

        oracledb.initOracleClient({libDir: libDir});
    };

    public async connect(): Promise<oracledb.Connection> {
        const { user, password, connectionString } = this.getStringConnection();
    
        const connection = await oracledb.getConnection({
            user: user,
            password: password,
            connectString: connectionString
        });

        return connection;
    };

    public async close(connection: oracledb.Connection): Promise<void> {
        await connection.close();
        console.log('Database closed');
    };

    public async executeSQL(sql: string, bindParams: BindParameters): Promise<oracledb.Result<unknown>> {
        await this.init();
        const conn = await this.connect();
        const result = await conn.execute(sql, bindParams);
        await conn.close();
        return result;
    };

};