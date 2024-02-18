const fs = require('fs').promises;


const readFileWithPromise = async (file) => {
    // try/catch
    const result1 = await fs.readFile(file);
    console.log('result1\n', result1.toString());
    const result2 = await fs.readFile(file);
    console.log('result2\n', result2.toString());
}

readFileWithPromise('./01.js');

// fs.readFile('./01.js',(error, data) =>{
//   if(error){
//     console.log('error', error);
//   } else{
//     console.log('data', data.toString());
//   }
// });

