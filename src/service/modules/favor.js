import XYRequest from '../request'

export function getFavorList() {
  return XYRequest.get({
    url: "/favor/list",
  });
}

export function getHistoryList() {
  return XYRequest.get({
    url: "/favor/history",
  });
}