import * as fs from 'fs';


export function saveToFile(fileName: string, data: Buffer) {

    fs.writeFile(fileName, Buffer.from(data), err => {
      if (err) {
          console.error(err);
      }else {
        console.log("The file was saved!");
      }
  
      return;
    });
  
};