import React from 'react';
import { DiseaseDoc } from '../types/api';
import { Activity } from 'lucide-react';

interface DiseaseCardProps {
  disease: DiseaseDoc;
  onTitleClick?: (label: string) => void;
}

export const DiseaseCard: React.FC<DiseaseCardProps> = ({ disease, onTitleClick }) => {
  const types = Array.isArray(disease.type) ? disease.type : [];

  const handleTitleClick = () => {
    if (onTitleClick) {
      onTitleClick(disease.label);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/30 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <h3 
            onClick={handleTitleClick}
            className="text-lg font-semibold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 cursor-pointer transition-colors"
          >
            {disease.label}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {disease.ontology_prefix}:{disease.short_form}
          </p>
          {disease.description && disease.description.length > 0 && (
            <p className="mt-3 text-gray-700 dark:text-gray-300">{disease.description[0]}</p>
          )}
          {types.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {types.map((type, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                >
                  {type.split('#').pop()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};