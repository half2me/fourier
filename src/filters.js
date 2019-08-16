export const formatMs = val =>
  Number(((val % 60000) / 1000).toFixed(0)) === 60
    ? (Math.floor(val / 60000) + 1) + ':00'
    : Math.floor(val / 60000)
    + ':'
    + (Number(((val % 60000) / 1000).toFixed(0)) < 10 ? '0' : '')
    + Number(((val % 60000) / 1000).toFixed(0));

export const formatHrs = duration =>
  Math.floor((duration/(1000*60*60)) %24) > 0
    ? Math.floor((duration/(1000*60*60)) % 24)
    + ' hr '
    +Math.floor((duration/(1000*60)) % 60)
    + ' min'
    : ''
    + Math.floor((duration/(1000*60)) % 60)
    + ' min';
