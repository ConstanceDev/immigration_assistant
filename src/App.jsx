import { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import ResultsList from './components/ResultsList';
import { immigrationPrograms } from './data/immigrationPrograms';
import { calculateEligibility } from './utils/eligibilityCalculator';

function App() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (formData) => {
    const eligiblePrograms = calculateEligibility(formData, immigrationPrograms);
    setResults(eligiblePrograms);
    setShowResults(true);
    
    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">去哪里 (Where to Go)</h1>
          <p className="text-gray-600 mt-2">Find the perfect immigration pathway for your profile</p>
        </header>

        <ProfileForm onSubmit={handleSubmit} />

        {showResults && (
          <div id="results-section" className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Immigration Options</h2>
            <ResultsList results={results} />
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 去哪里 (Where to Go) </p>
          <p className="mt-1">This tool provides general guidance only and is not a substitute for professional immigration advice.</p>
          <p className="mt-1"> Developed by Miss Wig. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;