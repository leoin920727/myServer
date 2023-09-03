// 獲取當前日期
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 1);

// 設置未來日期的上限為兩個月後
const futureDate = new Date();
futureDate.setMonth(currentDate.getMonth() + 2);

// 遍歷日期並列出
let d;
const dateRecord = {};

while (currentDate <= futureDate) {
  d = new Date(currentDate);
  console.log(d);
  dateRecord[d.toISOString().split("T")[0]] = [0, 1, 2];
  currentDate.setDate(currentDate.getDate() + 1);
}

console.log(dateRecord);
