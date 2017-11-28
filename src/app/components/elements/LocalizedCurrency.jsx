import { client } from 'config';

const {
    DEFAULT_CURRENCY,
} = client;

let localCurrencySymbol = DEFAULT_CURRENCY;
let localizedCurrency = (value) => value;

export { localizedCurrency, localCurrencySymbol }
