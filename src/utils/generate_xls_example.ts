import xlsx from 'node-xlsx';
import { saveToFile } from './fs.utils';

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

let buffer = xlsx.build([
  {name: 'mySheetName', data: data, options: sheetOptions},
  {name: 'mySecondSheet', data: dataSheet2, options: sheetOptions},
]); // Returns a buffer


saveToFile('temp.xlsx', buffer);

console.timeEnd('Performance');