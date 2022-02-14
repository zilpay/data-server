export function viewIcon(addr: string, theme: string) {
  addr = (addr === 'zil1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq9yf6pz') ? 'ZIL' : addr;

  return `https://meta.viewblock.io/zilliqa.${addr}/logo?t=${theme}`;
}
