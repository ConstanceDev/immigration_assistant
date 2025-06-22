import { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import ResultsList from './components/ResultsList';
import { calculateEligibility } from './utils/eligibilityCalculator';

function App() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (formData) => {
    const eligiblePrograms = calculateEligibility(formData);
    setResults(eligiblePrograms);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/logo.svg" alt="WHERE TO GO" className="h-8 w-8" />
              <span className="text-lg font-medium text-gray-900">WHERE TO GO</span>
            </div>
            
            {/* Navigation */}
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Profile</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 text-sm font-medium">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <img src="/header-logo.svg" alt="WHERE TO GO" className="mx-auto h-20 mb-6" />
            <h1 className="text-4xl font-bold text-green-700 mb-2">WHERE TO GO</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              FIND THE PERFECT IMMIGRATION PATHWAY FOR YOUR PROFILE
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <ProfileForm onSubmit={handleSubmit} />

        {showResults && (
          <div id="results-section" className="mt-8">
            <ResultsList results={results} />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 去哪里 (Where to Go)</p>
            <p className="mt-1">This tool provides general guidance only and is not a substitute for professional immigration advice.</p>
            <p className="mt-1">Developed by Miss Wig. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;