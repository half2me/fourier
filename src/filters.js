let keyArr = ['C','C#/D♭','D','D#/E♭','E','F','F#/G♭','G','G#/A♭','A','A#/B♭','B'];
let modeArr = ['Minor','Major'];

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

export const floor = val =>
  Math.floor(val);

export const key = val =>
  keyArr[val];

export const mode = val =>
  modeArr[val];

export const round = val =>
  Math.round(val);

export const percent = val =>
  (val*100).toFixed(1) + '%';
