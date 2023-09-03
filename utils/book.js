function getTwoMonDate() {
  // 獲取當前日期
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  // 設置未來日期的上限為兩個月後
  const futureDate = new Date();
  futureDate.setMonth(currentDate.getMonth() + 1);
  //   futureDate.setMonth(currentDate.getMonth() + 2);

  // 遍歷日期並列出
  let d;
  const dateRecord = {};

  while (currentDate <= futureDate) {
    d = new Date(currentDate);
    d.setHours(d.getHours() + 8);
    dateRecord[d.toISOString().split("T")[0]] = [0, 1, 2];
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateRecord;
}

function updateFreeDays(notWorkDays) {
  const freeDays = getTwoMonDate();
  notWorkDays.forEach((elm) => {
    elm.date = elm.date.toISOString().split("T")[0];
    freeDays[elm.date] = freeDays[elm.date].filter((item) => item != elm.time);
  });
  return freeDays;
}

function getFreeDays(freeWeekDays) {
  let d;
  // [7,1,2,3,4,5,6] 0:滿檔 1:有空擋
  const availableDay = [0, 0, 0, 0, 0, 0, 0];
  for (let date in freeWeekDays) {
    d = new Date(date);
    if (freeWeekDays[date].length) {
      availableDay[d.getDay()] = 1;
    }
  }
  // 預設星期日休息
  availableDay[0] = 0;
  return availableDay;
}

module.exports = { getTwoMonDate, updateFreeDays, getFreeDays };
