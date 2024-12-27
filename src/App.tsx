import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { DiseaseCard } from './components/DiseaseCard';
import { PopularDiseases } from './components/PopularDiseases';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { searchDiseases } from './services/api';
import { getPopularDiseases } from './services/popularDiseases';
import { DiseaseDoc } from './types/api';
import { Dna } from 'lucide-react';

function App() {
  const [query, setQuery] = useState('');
  const [diseases, setDiseases] = useState<DiseaseDoc[]>([]);
  const [popularDiseases, setPopularDiseases] = useState<DiseaseDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPopularDiseases = async () => {
      setLoadingPopular(true);
      try {
        const diseases = await getPopularDiseases();
        setPopularDiseases(diseases);
      } catch (err) {
        console.error('Failed to load popular diseases:', err);
      } finally {
        setLoadingPopular(false);
      }
    };

    loadPopularDiseases();
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchDiseases(query);
      setDiseases(response.response.docs);
    } catch (err) {
      setError('Failed to fetch diseases. Please try again.');
      setDiseases([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDiseaseSelect = async (label: string) => {
    setQuery(label);
    // Immediately trigger search after updating the query
    await searchDiseases(label).then(response => {
      setDiseases(response.response.docs);
    }).catch(err => {
      setError('Failed to fetch diseases. Please try again.');
      setDiseases([]);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <a 
                href="https://shifath.netlify.app" 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Go Back
              </a>
              <Dna className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Disease Explorer</h1>
            
            </div>
            <ThemeSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
          />

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          )}

          {error && (
            <div className="w-full max-w-3xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && diseases.length > 0 && (
            <div className="w-full max-w-3xl space-y-4">
              {diseases.map((disease) => (
                <DiseaseCard 
                  key={disease.id} 
                  disease={disease}
                  onTitleClick={handleDiseaseSelect}
                />
              ))}
            </div>
          )}

          {!loading && !error && query && diseases.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-400">
              {query && diseases.length === 0 && !loading && !error ? `click search to find"${query}"` : null}
            </div>
          )}

          {!loading && !query && (
            <PopularDiseases 
              diseases={popularDiseases} 
              isLoading={loadingPopular}
              onDiseaseSelect={handleDiseaseSelect}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;