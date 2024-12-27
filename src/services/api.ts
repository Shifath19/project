import axios from 'axios';
import { SearchResponse } from '../types/api';

const OLS_API_BASE = 'https://www.ebi.ac.uk/ols4/api';

export const searchDiseases = async (query: string): Promise<SearchResponse> => {
  const response = await axios.get<SearchResponse>(`${OLS_API_BASE}/select`, {
    params: {
      q: query,
      ontology: 'efo,mondo',
      rows: 20,
      start: 0,
      format: 'json'
    },
  });
  return response.data;
};