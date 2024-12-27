import { searchDiseases } from './api';
import { DiseaseDoc } from '../types/api';

const POPULAR_DISEASE_TERMS = [
  'diabetes',
  'asthma',
  'hypertension',
  'alzheimer',
  'parkinsons'
];

export const getPopularDiseases = async (): Promise<DiseaseDoc[]> => {
  try {
    const results = await Promise.all(
      POPULAR_DISEASE_TERMS.map(term => searchDiseases(term))
    );
    
    // Get the first result from each search
    return results
      .map(result => result.response.docs[0])
      .filter((disease): disease is DiseaseDoc => disease !== undefined);
  } catch (error) {
    console.error('Error fetching popular diseases:', error);
    return [];
  }
};