const express = require('express');
const path = require('path');
const mockLoans = require('./mockLoans.json');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

let counter = 0;
app.get('/loans/marketplace', function (req, res) {
  // Change the output a little bit so we know that it actually changed
  const updatedMockLoans = mockLoans.slice()
  updatedMockLoans[0] = Object.assign({}, updatedMockLoans[0], { name: updatedMockLoans[0].name + ' - ' + counter++})
  return res.send(JSON.stringify(updatedMockLoans));
});

app.listen(process.env.PORT || 3001);