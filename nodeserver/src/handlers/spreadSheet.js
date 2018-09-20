const GoogleSpreadsheet = require('google-spreadsheet')
const creds = require('../client_secret.json')
const fs = require('fs-extra')
const path = require('path')

const getDoc = () => {
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

const getInfo = (doc) => {
  return new Promise((resolve) => {
    doc.getInfo(function (err, rows) {
      if (err) {
        throw (err)
      }
      resolve(rows)
    })
  })
}

const getRows = (sheet, doc) => {
  return new Promise((resolve) => {
    doc.getRows(sheet, function (err, rows) {
      if (err) {
        throw (err)
      }
      resolve(rows)
    })
  })
}

const getSheetIndex = (worksheets, title) => {
  for (var i = 0; i < worksheets.length; i += 1) {
    if (worksheets[i].title === title) {
      return i + 1
    }
  }
  return -1
}

const getSheetRows = async (sheetTitle) => {
  const cacheFile = path.resolve(__dirname, `../../../client/static/data/${sheetTitle}.json`)
  const doc = getDoc()
  const [cacheInfo, info] = await Promise.all([fs.stat(cacheFile), getInfo(await doc)])
  let cacheUpdate = Date.parse(cacheInfo.mtime)
  let googleUpdate = Date.parse(info.updated)
  if (cacheUpdate > googleUpdate) {
    return false
  }
  const sheetNumber = getSheetIndex(info.worksheets, sheetTitle)
  return getRows(sheetNumber, await doc)
}

const cardsFromRows = (sheetTitle, rows) => {
  const cacheFile = path.resolve(__dirname, `../../../client/static/data/${sheetTitle}.json`)
  let cards = []
  rows.forEach((row) => {
    const card = (({
      title,
      images,
      text,
      flex,
      aspect
    }) => ({
      title,
      images,
      text,
      flex: parseInt(flex),
      aspect
    }))(row)
    cards.push(card)
  })
  let json = JSON.stringify(cards, null, 4)
  fs.writeFile(cacheFile, json, 'utf8', console.log(`${sheetTitle} Cache Updated`))
  return cards
}

const getCards = async ({
  sheetTitle
}) => {
  let rows = await getSheetRows(sheetTitle)
  if (!rows) {
    return false
  }
  return cardsFromRows(sheetTitle, rows)
}

const listFromRows = (sheetTitle, rows) => {
  const cacheFile = path.resolve(__dirname, `../../../client/static/data/${sheetTitle}.json`)
  let items = []
  rows.forEach((row) => {
    const item = (({
      title,
      date,
      subtitle
    }) => ({
      title,
      date,
      subtitle
    }))(row)
    items.push(item)
  })
  let json = JSON.stringify(items, null, 4)
  fs.writeFile(cacheFile, json, 'utf8', console.log(`${sheetTitle} Cache Updated`))
  return items
}

const getList = async ({
  sheetTitle
}) => {
  let rows = await getSheetRows(sheetTitle)
  if (!rows) {
    return false
  }
  return listFromRows(sheetTitle, rows)
}

module.exports = {
  'publicGetCards': getCards,
  'publicGetList': getList
}
