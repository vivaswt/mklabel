'use explicit';

const express = require('express');
const app = express();
const path = require('path');
const PDFDocument = require('pdfkit');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/a', (req, res) => {
  const data = {name: 'ラベル作成ツール', age: 12};
  res.json(data);
});

app.post('/pdf', upload.array(), (req, res) => {
  const requests = JSON.parse(req.body.requests);
  console.log(requests);

  const doc = new PDFDocument({
    size: 'B5',
    layout: 'landscape',
    autoFirstPage: false
  });
  doc.font('./fonts/ipaexg.ttf');

  requests.forEach(request => putPDF(request, doc));

  doc.pipe(res);
  doc.end();
});

app.use(express.static(path.join(__dirname, 'client/build')));

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});*/

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`now listening on ${port}!`);

function ctop(centimeter) {
  return 72 * centimeter / 2.54;
}

function putPDF(request, doc) {
  for (let i = 0; i < request.page; i++) {
    doc.addPage();

    // 品名
    doc.fontSize(ctop(1.3));
    doc.text(request.material, 0, ctop(3.4), {
      align: 'center',
      width: doc.page.width
    });

    // 巾
    doc.fontSize(ctop(1.2));
    doc.text(`${request.width}巾`, ctop(2.5), ctop(5.8), {
      align: 'right',
      width: ctop(5)
    });

    // 継目・目玉・合計
    doc.fontSize(ctop(0.6));
    doc.text('継目', ctop(18), ctop(9.9));
    doc.text('目玉', ctop(20.5), ctop(9.9));
    doc.text('合計', ctop(16), ctop(14.4));
  }
}
