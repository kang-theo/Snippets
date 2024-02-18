const fs = require('fs');


const readFileWithPromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file,(error, data) =>{
      if(error){
        reject(error);
      } else{
        resolve(data);
      }
    });
  });
}

readFileWithPromise('./generator.ts')
  .then(data => {
    console.log('async 1', data.toString());
    readFileWithPromise('./01.js')
      .then(data => {
        console.log('async 2', data.toString());
      })
      .catch(error => {
        console.error('async 2', error);
      })
  })
  .catch(error => {
    console.error('async 1', error);
  })

