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
    doc.getInfo(function (err, info) {
      if (err) {
        throw (err)
      }
      resolve(info)
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
const getFileData = async (cacheFile) => {
  try {
    let stats = await fs.stat(cacheFile)
    return stats
  } catch (err) {
    return false
  }
}

const getUpdatedWorkSheets = async (sheetTitle, doc) => {
  const cacheFilePath = getCacheFilePath(sheetTitle)
  const [cacheInfo, info] = await Promise.all([getFileData(cacheFilePath), getInfo(await doc)])
  if (!info) {
    throw new Error('Google file info missing')
  }
  let cacheUpdate = cacheInfo ? Date.parse(cacheInfo.mtime) : 0
  let googleUpdate = Date.parse(info.updated)
  if (cacheUpdate > googleUpdate) {
    console.log(`Cache ${cacheFilePath} more recent than Google file ${info.title}`)
    return false
  }
  return info.worksheets
}

const getUpdatedSheetRows = async (sheetTitle) => {
  const doc = getDoc()
  const updatedWorksheets = await getUpdatedWorkSheets(sheetTitle, doc)
  if (!updatedWorksheets) return false
  const sheetNumber = getSheetIndex(await updatedWorksheets, sheetTitle)
  return getRows(sheetNumber, await doc)
}

const getCacheFilePath = (sheetTitle) => {
  return path.resolve(__dirname, `../../../client/static/data/${sheetTitle}.json`)
}

const cardsFromRows = (sheetTitle, rows) => {
  const cacheFilePath = getCacheFilePath(sheetTitle)
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
      aspect: parseFloat(aspect)
    }))(row)
    cards.push(card)
  })
  let json = JSON.stringify(cards, null, 4)
  fs.writeFile(cacheFilePath, json, 'utf8', console.log(`${sheetTitle} Cache Updated`))
  return cards
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

const getUpdatedCards = async ({
  sheetTitle
}) => {
  let updatedRows = await getUpdatedSheetRows(sheetTitle)
  if (!updatedRows) return false
  return cardsFromRows(sheetTitle, updatedRows)
}

const cacheUpdated = async (sheetTitle) => {
  const cacheFile = path.resolve(__dirname, `../../../client/static/data/${sheetTitle}.json`)
  const buildFile = path.resolve(__dirname, `../../../client/dist/index.html`)
  const [cacheInfo, buildInfo] = await Promise.all([fs.stat(cacheFile), fs.stat(buildFile)])
  let cacheUpdate = Date.parse(cacheInfo.mtime)
  let buildUpdate = Date.parse(buildInfo.mtime)
  return (cacheUpdate > (buildUpdate + 1000))
}
const getCardsCache = async ({
  sheetTitle
}) => {
  let updated = await cacheUpdated(sheetTitle)
  if (!updated) return false
  const cacheFile = path.resolve(__dirname, `../../../client/static/data/${sheetTitle}.json`)
  const cacheData = await fs.readFile(cacheFile)
  return JSON.parse(cacheData)
}

const getList = async ({
  sheetTitle
}) => {
  let rows = await getUpdatedSheetRows(sheetTitle)
  if (!rows) return false
  return listFromRows(sheetTitle, rows)
}

module.exports = {
  'publicGetCards': getUpdatedCards,
  'publicGetCardsCache': getCardsCache,
  'publicGetList': getList
}
