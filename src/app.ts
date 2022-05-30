import xlsx from 'node-xlsx';
import { OracleConnection } from './database';
import { saveToFile } from './utils/fs.utils';

type ArrayType = (number[] | (string | boolean | null)[] | (string | Date)[])[];

async function main(){
  console.time('Performance');

  try {
    const db = new OracleConnection();

    const sql = `SELECT * FROM DUAL`;
    const result = await db.executeSQL(sql, []);
  
    if (result.rows && result.metaData) {
  
      const columns = result.metaData;//Get columns of the response;
      const rows = result.rows;
  
      const headerSheet = columns.map(item => item.name); //Get just the name of the column
  
      const dataSheet = [headerSheet, ...rows] as ArrayType;
      
      const sheetOptions = {};
  
      const buffer = xlsx.build([
        {
          name: 'mySheetName', 
          data: dataSheet, 
          options: sheetOptions
        }
      ]);
      const path = 'temp.xlsx';
  
      saveToFile(path, buffer);
  
      console.log(`The file was saved! \n ${path}`);
    };
    
  } catch (error) {
    console.error(error)
  } finally {
    console.timeEnd('Performance');
  }

  return;

};

main();

