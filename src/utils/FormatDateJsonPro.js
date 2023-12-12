export const FormatDateJsonPro = (date, type = 0) => {
  if (date === "" || date === "1900-01-01T00:00:00") return "";
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    dayNumber = "" + d.getUTCDay(),
    year = d.getFullYear(),
    h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (month.toString().length < 2) month = "0" + month;
  if (day.toString().length < 2) day = "0" + day;
  if (h.toString().length < 2) h = "0" + h;
  if (m.toString().length < 2) m = "0" + m;

  if (s.toString().length < 2) s = "0" + s;

  if (date === undefined) return "";

  if (type === 0) {
    return [month, day, year].join("/") + " " + [h, m, s].join(":");
  }
  if (type === 1) {
    return [month, day, year].join("/") + " 00:00:00";
  }
  if (type === 2) {
    return [month, day, year].join("/") + " 23:59:59";
  }
  if (type === 3) {
    return [month, day, year].join("/");
  }
  if (type === 4) return [year, month, day].join("-");

  if (type === 6) return { year: year, month: month };

  if (type === 7) return [day, month, year].join("/");

  if (type === 8) return [month, year].join("-");

  if (type === 9) return [year, month].join("-");

  if (type === 5) return [h, m].join(":") + " " + [day, month, year].join("/");

  if (type === 10) {
    return [day, month, year].join("/") + " " + [h, m, s].join(":");
  }
  if (type === 11) {
    return [day, month].join("/");
  }
  if (type === 12) {
    return ["Ngày", day, "tháng", month, "năm", year].join(" ");
  }
  if (type === 13) {
    return [year, month, day, h, m, s].join("");
  }
  if (type === 14) {
    return [day, "/", month].join("");
  }
};
