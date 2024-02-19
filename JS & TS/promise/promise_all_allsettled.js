const p1 = new Promise((resolve, reject) => {
  resolve('成功了')
})
const p2 = Promise.resolve('success')
const p3 = Promise.reject('失败')

// sync tasks run firstly, and put the micro tasks like then here in the micro task queue, which when all sync tasks has been finished
Promise.all([p1, p2]).then((result) => { 
  console.log(result)  //["成功了", "success"]
}).catch((error) => {
  //未被调用
})

Promise.all([p1, p3, p2]).then((result) => {
  //未被调用
}).catch((error) => {
  console.log(error)  //"失败"
});

Promise.allSettled([p1, p2, p3])
.then(values => {
    console.log(values)
})