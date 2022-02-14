import { getCurrencyRate } from '../entrypoints/freecurrencyapi';
import { getZILRate } from '../entrypoints/coingecko';

const rates = [
  "JPY",
  "CNY",
  "CHF",
  "CAD",
  "MXN",
  "INR",
  "BRL",
  "RUB",
  "KRW",
  "IDR",
  "TRY",
  "SAR",
  "SEK",
  "NGN",
  "PLN",
  "ARS",
  "NOK",
  "TWD",
  "IRR",
  "AED",
  "COP",
  "THB",
  "ZAR",
  "DKK",
  "MYR",
  "SGD",
  "ILS",
  "HKD",
  "EGP",
  "PHP",
  "CLP",
  "PKR",
  "IQD",
  "DZD",
  "KZT",
  "QAR",
  "CZK",
  "PEN",
  "RON",
  "VND",
  "BDT",
  "HUF",
  "UAH",
  "AOA",
  "MAD",
  "OMR",
  "CUC",
  "BYR",
  "AZN",
  "LKR",
  "SDG",
  "SYP",
  "MMK",
  "DOP",
  "UZS",
  "KES",
  "GTQ",
  "URY",
  "HRV",
  "MOP",
  "ETB",
  "CRC",
  "TZS",
  "TMT",
  "TND",
  "PAB",
  "LBP",
  "RSD",
  "LYD",
  "GHS",
  "YER",
  "BOB",
  "BHD",
  "CDF",
  "PYG",
  "UGX",
  "SVC",
  "TTD",
  "AFN",
  "NPR",
  "HNL",
  "BIH",
  "BND",
  "ISK",
  "KHR",
  "GEL",
  "MZN",
  "BWP",
  "PGK",
  "JMD",
  "XAF",
  "NAD",
  "ALL",
  "SSP",
  "MUR",
  "MNT",
  "NIO",
  "LAK",
  "MKD",
  "AMD",
  "MGA",
  "XPF",
  "TJS",
  "HTG",
  "BSD",
  "MDL",
  "RWF",
  "KGS",
  "GNF",
  "SRD",
  "SLL",
  "XOF",
  "MWK",
  "FJD",
  "ERN",
  "SZL",
  "GYD",
  "BIF",
  "KYD",
  "MVR",
  "LSL",
  "LRD",
  "CVE",
  "DJF",
  "SCR",
  "SOS",
  "GMD",
  "KMF",
  "STD",
  "BTC",
  "XRP",
  "AUD",
  "BGN",
  "JOD",
  "GBP",
  "ETH",
  "EUR",
  "LTC",
  "NZD"
];


// getZILRate(rates).then(console.log);