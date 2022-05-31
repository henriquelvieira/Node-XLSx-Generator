import { xlsBuilder, xlsBuilderProps} from './xlsBuilder';

function main() {
  const querysToRun = [
    {
      query: `SELECT * FROM DUAL`,
      params: [],
      path: 'temp.xlsx',
      sheetName: 'mySheetName'
    }
  ] as xlsBuilderProps[];

  querysToRun.forEach(item => xlsBuilder(item));
};

main();

