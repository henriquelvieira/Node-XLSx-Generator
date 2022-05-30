"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleConnection = void 0;
const env_1 = __importDefault(require("../utils/env"));
const oracledb_1 = __importDefault(require("oracledb"));
;
class OracleConnection {
    getStringConnection() {
        const user = env_1.default.get('ORACLE_USER');
        const password = env_1.default.get('ORACLE_PASSWORD');
        const connectionString = env_1.default.get('ORACLE_CONNECTION');
        const libDir = env_1.default.get('ORACLE_LIBDIR');
        return {
            user,
            password,
            connectionString,
            libDir
        };
    }
    ;
    async init() {
        const { libDir } = this.getStringConnection();
        oracledb_1.default.initOracleClient({ libDir: libDir });
    }
    ;
    async connect() {
        const { user, password, connectionString } = this.getStringConnection();
        const connection = await oracledb_1.default.getConnection({
            user: user,
            password: password,
            connectString: connectionString
        });
        return connection;
    }
    ;
    async close(connection) {
        await connection.close();
        console.log('Database closed');
    }
    ;
    async executeSQL(sql, bindParams) {
        await this.init();
        const conn = await this.connect();
        const result = await conn.execute(sql, bindParams);
        await conn.close();
        return result;
    }
    ;
}
exports.OracleConnection = OracleConnection;
;
