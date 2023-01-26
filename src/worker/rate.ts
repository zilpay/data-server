import bunyan from 'bunyan';

import { getZILRate } from '../entrypoints/coingecko';
import { Rate } from '../models/rate';
import { initORM } from '../orm';

const log = bunyan.createLogger({
  name: "RATE_TASK"
});
const rates = [
  "USD",
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

(async function(){
  const orm = await initORM();
  const rateRepository = orm.em.getRepository(Rate);
  const count = await rateRepository.count();

  async function updateRate() {
    log.info('start update rates');
    try {
      const { zilliqa } = await getZILRate(rates);
      const dataRates = new Rate(zilliqa);

      await orm.em.persistAndFlush(dataRates);

      log.info('finished update rates price', zilliqa.usd, 'usd');
    } catch (err) {
      log.error(err);
    }
  }

  updateRate();

  setInterval(() => updateRate(), 50000);
}());

