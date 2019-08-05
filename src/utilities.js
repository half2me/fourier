export default {
  msToMin(val) {
    return Number(((val % 60000) / 1000).toFixed(0)) === 60
      ? (Math.floor(val / 60000) + 1) + ":00"
      : Math.floor(val / 60000)
      + ":"
      + (Number(((val % 60000) / 1000).toFixed(0)) < 10 ? "0" : "")
      + Number(((val % 60000) / 1000).toFixed(0));
  },
};
