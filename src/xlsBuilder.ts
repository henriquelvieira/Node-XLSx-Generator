import xlsx from 'node-xlsx';
import { OracleConnection } from './database';
import { saveToFile } from './utils/fs.utils';

type ArrayType = (number[] | (string | boolean | null)[] | (string | Date)[])[];

export interface xlsBuilderProps {
  query: string;
  params: [];
  path: string;
  sheetName: string;
};

export async function xlsBuilder({
    query,
    params,
    path,
    sheetName
  }: xlsBuilderProps){
    console.time('Performance');
  
    try {
      const db = new OracleConnection();
      const sql = query;
      const result = await db.executeSQL(sql, params);
      
      if (!result.rows || !result.metaData) return;
  
      const columns = result.metaData; //Get columns of the response;
      const rows = result.rows; //Get rows of the response; 
  
      const headerSheet = columns.map(item => item.name); //Get just the name of the column
      const dataSheet = [headerSheet, ...rows] as ArrayType; //Mount array to xlsx.build
  
      const buffer = xlsx.build([
        {
          name: sheetName, 
          data: dataSheet, 
          options: {}
        }
      ]);
  
      saveToFile(path, buffer);
      console.log(`The file was saved! \n ${path}`);    
    } catch (error) {
      console.error(error)
    } finally {
      console.timeEnd('Performance');
    };
  
  };