import React, { useState } from 'react';
import { 
  educationOptions, 
  familyStatusOptions, 
  jobTypeOptions, 
  languageScoreOptions 
} from '../data/immigrationPrograms';


const ProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    age:'',
    education:'bachelors',
    workExperience:'',
    language: {
      english: false,
      french: false,
      englishScore:'',
      frenchScore:''
    },
    annualIncome:'',
    netWorth:'',
    familyStatus:'single',
    jobType:'professional'
  });

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target;

    if (name.startsWith('language.')) {
       const langKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        language: {
          ...prev.language,
          [langKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };


 
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-blue-800">
        Your Profile
      </h2>
      <form onSubmit={handleSubmit}>
      {/* Age */}
      <div className="form-group">
        <label htmlFor="age"className="block text-gray-700 mb-2">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="18"
          max="100"
          required
        />
      </div>
      {/* Education */}
      <div className="form-group mt-2">
        <label htmlFor="education" className="block text-gray-700 mb-2">
          Education
        </label>
        <select
        id="education"
        name="education"
        value={formData.education}
        onChange={handleChange}
        className="w-60 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {educationOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Work Experience */}
      <div className="form-group mt-2">
        <label htmlFor="workExperience" className="block text-gray-700 mb-2">
          Years of Work Experience
        </label>
        <input
        id="workExperience"
        name="workExperience"
        type="number"
        value={formData.workExperience}
        onChange={handleChange}
        className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="0"
        required
        />
      </div>

      {/* Language */}
      <div className="form-group mt-2"> 
        <label htmlFor="language" className="block text-gray-700 mb-2">
          Language Proficiency
        </label>
        <div className="space-y-2">
          {/* English */}
          <div className="flex items-center">
            <input
            type="checkbox"
            id="english"
            name="language.english"
            checked={formData.language.english}
            onChange={handleChange}
            className="appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 mr-2"
            />
            <label htmlFor="english" className="mr-4">
              English
            </label>
            {formData.language.english && (
              <select
              id="englishScore"
              name="language.englishScore"
              value={formData.language.englishScore}
              onChange={handleChange}
              className="w-43 border border-gray-300 rounded-md px-2 py-1 text-sm text-center"
              >
                {languageScoreOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* French */}
          <div className="flex items-center">
            <input
            type="checkbox"
            id="french"
            name="language.french"
            checked={formData.language.french}
            onChange={handleChange}
            className="appearance-none h-4 w-4 border border-gray-300 rounded bg-white checked:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 mr-2"
            />
            <label htmlFor="english" className="mr-4">
              French
            </label>
            {formData.language.french && (
              <select
              id="frenchScore"
              name="language.frenchScore"
              value={formData.language.frenchScore}
              onChange={handleChange}
              className="w-43 border border-gray-300 rounded-md px-2 py-1 text-sm text-center"
              >
                {languageScoreOptions.map(option=> (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
      {/* Annual Income */}
      <div className="form-group mt-2">
        <label htmlFor="annualIncome" className="block text-gray-700 mb-2">
          Annual Income
        </label>
        <input
        type="number"
        id="annualIncome"
        name="annualIncome"
        value={formData.annualIncome}
        onChange={handleChange}
        className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="0"
        />
      </div>

      {/* Net Worth */}
      <div className="form-group mt-2">
        <label htmlFor="netWorth" className="block text-gray-700 mb-2">
          Net Worth
        </label>
        <input
        type="number"
        name="netWorth"
        value={formData.netWorth}
        onChange={handleChange}
        className="w-32 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="0"
        />

      {/* Family Status */}
      <div className="form-group mt-2">
        <label htmlFor="familyStatus" className="block text-gray-700 mb-2">
          Family Status
        </label>
        <select
          id="familyStatus"
          name="familyStatus"
          value={formData.familyStatus}
          onChange={handleChange}
          className="w-45 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {familyStatusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="form-group mt-2">
        <label htmlFor="jobType" className="block text-gray-700 mb-2">
          Job Type
        </label>
        <select
          id="jobType"
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="w-45 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {jobTypeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </div>

      {/* Submit Button */}
      <div className="mt-8 text-center">
        <button
         type="submit"
         className="bg-indigo-600 text-white px-6 py-3 rounded-md shadown hover:bg-indigo-400 focus:ring-2 focus:ring-indigo-500 transition duration-150"
         onClick={handleSubmit}
        >
          Find Your Immigration Options
        </button>

      </div>
      </form>
    </div>
  )
};

export default ProfileForm;