import { create } from 'apisauce';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-API-KEY': 'SAN23UMnBHT2XaxYLSKDDMFe'
}

const api = create({
  baseURL: 'https://dev.api.choppersclub.com.br/mobile',
  headers: headers
});

export default api;