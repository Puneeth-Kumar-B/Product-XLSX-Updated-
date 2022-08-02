const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const product = require('./models/product')
const upload = require('./middleware/upload')
const XLSX = require('xlsx')


const authRoute = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute')
const couponRoute = require('./routes/couponroute')
const productRoute = require('./routes/productRoute')

mongoose.connect('mongodb://localhost:27017/newdb')
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established!')
})


const app = express();
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(express.static(path.resolve(__dirname, 'public')));


app.get('/product/exportdata', (req, res) => {
    var wb = XLSX.utils.book_new();
    product.find((err, data) => {
        if (err) {
            console.log(err)
        } else {
            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname + '/public/exportdata.xlsx'
            XLSX.utils.book_append_sheet(wb, ws, "sheet1");
            XLSX.writeFile(wb, down);
            res.download(down)
        }
    });
});


// app.post('/product/uploadxlsx', upload.single('uploads'), (req, res) => {
//     var workbook = XLSX.readFile(req.file.path);
//     var sheetName = workbook.SheetNames;
//     sheetName.forEach(() => {
//         var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
//         product.insertMany(xlData, (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('Excel Data Added To Database Successfully');
//                 res.json({ message: 'Excel Data Added To Database Successfully', data })
//             }
//         })
//     });
// });



app.post('/product/uploadxlsx', upload.single('uploads'), (req, res) => {
    var workbook = XLSX.readFile(req.file.path);
    var sheetName = workbook.SheetNames;
    sheetName.forEach(async() => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
//         const productExist = await product.find({});
        for (let i = 0; i < xlData.length; i++) {
            if (!xlData[i]._id) {
                product.create(xlData[i]);
            } else {
                const productExist = await product.findById(xlData[i]._id);

                if (!(JSON.stringify(productExist) === JSON.stringify(xlData[i]))) {
                    await product.updateOne({ _id: xlData[i]._id }, { $set: xlData[i] }, { new: true });
                }
            }
        }
    })
});



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Connection at ${port}`);
});

app.use('/user', authRoute)
app.use('/admin', adminRoute)
app.use('/api', couponRoute)
app.use('/product', productRoute)
