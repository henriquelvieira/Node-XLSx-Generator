import * as fs from 'fs/promises';


export async function saveToFile(fileName: string, data: Buffer): Promise<void> {
  try {
    await fs.writeFile(fileName, Buffer.from(data));    
  } catch (error) {
    console.log(error);
  };  
};