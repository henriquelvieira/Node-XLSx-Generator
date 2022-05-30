"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const database_1 = require("./database");
const fs_utils_1 = require("./utils/fs.utils");
async function main() {
    console.time('Performance');
    const db = new database_1.OracleConnection();
    const sql = `SELECT * FROM HLVIEIRA.T_CLIENTES_BANCOS_HL`;
    const result = await db.executeSQL(sql, []);
    if (result.rows && result.metaData) {
        const columns = result.metaData; //Get columns of the response;
        const rows = result.rows;
        const headerSheet = columns.map(item => item.name); //Get just the name of the column
        const dataSheet = [headerSheet, ...rows];
        const sheetOptions = {};
        const buffer = node_xlsx_1.default.build([
            {
                name: 'mySheetName',
                data: dataSheet,
                options: sheetOptions
            }
        ]);
        const path = 'temp.xlsx';
        (0, fs_utils_1.saveToFile)(path, buffer);
        console.log(`The file was saved! \n ${path}`);
        console.timeEnd('Performance');
        return;
    }
    ;
}
;
main();
