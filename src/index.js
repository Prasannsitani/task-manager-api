const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const app = express()

app.use(express.json())
app.use(userRouter, taskRouter)
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})




// Basics of multer to upload images.
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // For Only upload pdf file.
//         // !file.originalname.endsWith('.pdf')
//         // Below code is to accept the .doc or .docx file by using regular expression.
//         if(!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a Word document'))
//         }
//         cb(undefined, true)
//     } 
// })

// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (err, req, res, next) => {
//     res.status(400).send({Error: err.message})
// })


// Function for random text generator
// function generate(length) {
//     var temp = ''
//     var availChars = 'abcdefghijkljjnk nskdncs'
//     for(let i=0; i<length; i++) {
//         temp += availChars.charAt(Math.floor(Math.random() * availChars.length))
//     }
//     return temp
// }

// console.log(generate(3))