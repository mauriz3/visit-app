import { GET_VISITS, ADD_VISIT } from "./VisitsTypes";
import { BROWSER, OS } from "./VisitsTypes";

const initialState = {
  rawVisits: [],
  newVisits: 0,
  recurrentVisits: 0,
  visitsFormattedByOSs: [],
  visitsFormattedByBrowsers: []
};

function getNewVisits(visits) {
  const newVisits = visits.filter(visit => {
    return visit.is_new === true
  });
  return Array.isArray(newVisits) ? newVisits.length : 0
}

function getRecurrentVisits(visits) {
  const recurrentVisits = visits.filter(visit => {
    return visit.is_new === false
  });
  return Array.isArray(recurrentVisits) ? recurrentVisits.length : 0
}

function createFormateDate(visits) {
  let dates = []
  let formatedData = []
  visits.forEach(visit => {
    if (!dates.includes(visit.created_at)) {
      dates.push(visit.created_at)
    }
  });
  dates.forEach(date => {
    formatedData.push([date, 0, 0, 0, 0, 0, 0])
  })
  return formatedData
}

function filterByOS(visits) {
  const formatedData = createFormateDate(visits)
  formatedData.forEach(row => {
    visits.forEach(visit => {
      if (visit.created_at === row[0]) {
        switch (visit.os) {
          case OS.WINDOWS.NAME:
            row[OS.WINDOWS.ID] += 1
            break;
          case OS.MACOS.NAME:
            row[OS.MACOS.ID] += 1
            break;
          case OS.LINUX.NAME:
            row[OS.LINUX.ID] += 1
            break;
          case OS.ANDROID.NAME:
            row[OS.ANDROID.ID] += 1
            break;
          case OS.IOS.NAME:
            row[OS.IOS.ID] += 1
            break;
          case OS.UNKNOWN.NAME:
            row[OS.UNKNOWN.ID] += 1
            break;
          default:
            break;
        }
      }
    })
  })
  return [
    ['date', OS.WINDOWS.NAME, OS.MACOS.NAME, OS.LINUX.NAME, OS.ANDROID.NAME, OS.IOS.NAME, OS.UNKNOWN.NAME],
    ...formatedData
  ]
};

function filterByBrowser(visits) {
  const formatedData = createFormateDate(visits)
  formatedData.forEach(row => {
    visits.forEach(visit => {
      if (visit.created_at === row[0]) {
        switch (visit.browser) {
          case BROWSER.CHROME.NAME:
            row[BROWSER.CHROME.ID] += 1
            break;
          case BROWSER.EDGE.NAME:
            row[BROWSER.EDGE.ID] += 1
            break;
          case BROWSER.SAFARI.NAME:
            row[BROWSER.SAFARI.ID] += 1
            break;
          case BROWSER.FIREFOX.NAME:
            row[BROWSER.FIREFOX.ID] += 1
            break;
          case BROWSER.OPERA.NAME:
            row[BROWSER.OPERA.ID] += 1
            break;
          case BROWSER.UNKNOWN.NAME:
            row[BROWSER.UNKNOWN.ID] += 1
            break;
          default:
            break;
        }
      }
    })
  })
  return [
    ['date', BROWSER.CHROME.NAME, BROWSER.EDGE.NAME, BROWSER.SAFARI.NAME, BROWSER.FIREFOX.NAME, BROWSER.OPERA.NAME, BROWSER.UNKNOWN.NAME],
    ...formatedData
  ]
};

export const visitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VISITS:
      return {
        ...state,
        rawVisits: action.payload,
        newVisits: getNewVisits(action.payload),
        recurrentVisits: getRecurrentVisits(action.payload),
        visitsFormattedByOSs: filterByOS(action.payload),
        visitsFormattedByBrowsers: filterByBrowser(action.payload)
      };
    case ADD_VISIT:
      return {
        ...state,
        rawVisits: [...state.rawVisits, action.payload]
      };
    default:
      return state;
  }
};
