import React from 'react';
import { DiseaseCard } from './DiseaseCard';
import { DiseaseDoc } from '../types/api';

interface PopularDiseasesProps {
  diseases: DiseaseDoc[];
  isLoading: boolean;
  onDiseaseSelect: (label: string) => void;
}

export const PopularDiseases: React.FC<PopularDiseasesProps> = ({ 
  diseases, 
  isLoading,
  onDiseaseSelect 
}) => {
  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 dark:border-green-400 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading popular diseases...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Popular Diseases</h2>
      <div className="space-y-4">
        {diseases.map((disease) => (
          <DiseaseCard 
            key={disease.id} 
            disease={disease} 
            onTitleClick={onDiseaseSelect}
          />
        ))}
      </div>
    </div>
  );
};