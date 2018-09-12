import GoogleSpreadsheet from 'google-spreadsheet'
var creds = require('../client_secret.json')

var getDoc = () => {
  return new Promise((resolve) => {
    // Create a document object using the ID of the spreadsheet - obtained from its URL.
    var doc = new GoogleSpreadsheet('1sZx9y2cRL_iASLu4zmd7Xg6epXegilm-Twdq_fvbjgo')
    // Authenticate with the Google Spreadsheets API.
    doc.useServiceAccountAuth(creds, function (err) {
      // Get all of the rows from the spreadsheet.
      if (err) {
        throw (err)
      }
      resolve(doc)
    })
  })
}

var getInfo = (doc) => {
  return new Promise((resolve) => {
    doc.getInfo(function (err, rows) {
      if (err) {
        throw (err)
      }
      resolve(rows)
    })
  })
}

var getRows = (sheet, doc) => {
  return new Promise((resolve) => {
    doc.getRows(sheet, function (err, rows) {
      if (err) {
        throw (err)
      }
      resolve(rows)
    })
  })
}

var getSheet = async (sheet) => {
  let doc = await getDoc()
  return Promise.all([getInfo(doc), getRows(sheet, doc)])
}

export default {
  getSheet
}
