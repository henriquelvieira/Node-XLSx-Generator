"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_xlsx_1 = __importDefault(require("node-xlsx"));
const fs_utils_1 = require("./utils/fs.utils");
console.time('Performance');
const headerSheet = ['Coluna2', 'Coluna3', 'Coluna4', 'Coluna5'];
const data = [
    headerSheet,
    [1, 2, 3],
    [true, false, null, 'sheetjs'],
    ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'],
    ['baz', null, 'qux'],
];
const dataSheet2 = [
    headerSheet,
    [4, 5, 6],
    [7, 8, 9, 10],
    [11, 12, 13, 14],
    ['baz', null, 'qux'],
];
const sheetOptions = {};
let buffer = node_xlsx_1.default.build([
    { name: 'mySheetName', data: data, options: sheetOptions },
    { name: 'mySecondSheet', data: dataSheet2, options: sheetOptions },
]); // Returns a buffer
(0, fs_utils_1.saveToFile)('temp.xlsx', buffer);
console.timeEnd('Performance');
