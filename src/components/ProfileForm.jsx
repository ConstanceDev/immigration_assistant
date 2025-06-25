import React, { useState } from 'react';
import { 
  educationOptions,
  jobTypeOptions,
  currencyOptions,
  ieltsScoreOptions,
  workLocationOptions,
  extraordinaryAbilityOptions,
  getUniversitiesByGraduationDate
} from '../data/immigrationRequirements';

const ProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Basics
    name: '',
    age: '',
    email: '',
    
    // Education
    education: '',
    graduationDate: '',
    university: '',
    
    // Professional Experience
    workExperience: '',
    isPaidWork: '',
    workLocation: [],
    profession: '',
    salaryCurrency: 'USD',
    annualSalary: '',
    
    // Language Ability
    ielts: {
      listening: '',
      speaking: '',
      reading: '',
      writing: ''
    },
    
    // Additional Options
    higherEducation: null,
    extraordinaryAbility: null,
    extraordinaryAchievements: [],
    investments: null,
    investmentBudget: '',
    netWorth: '',
    startBusiness: null,
    businessFunding: ''
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNumber = (value) => {
    return /^\d+$/.test(value);
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (name.startsWith('ielts.')) {
      const skill = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        ielts: {
          ...prev.ielts,
          [skill]: value
        }
      }));
    } else if (name === 'workLocation') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          workLocation: [...prev.workLocation, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          workLocation: prev.workLocation.filter(loc => loc !== value)
        }));
      }
    } else if (name === 'extraordinaryAchievements') {
      if (checked) {
        setFormData(prev => ({
          ...prev,
          extraordinaryAchievements: [...prev.extraordinaryAchievements, value]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          extraordinaryAchievements: prev.extraordinaryAchievements.filter(achievement => achievement !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basics validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (!validateNumber(formData.age)) {
      newErrors.age = 'Age must be a number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Education validation
    if (!formData.education) {
      newErrors.education = 'Education level is required';
    }

    // Professional Experience validation
    if (!formData.workExperience) {
      newErrors.workExperience = 'Year of work experience is required';
    } else if (!validateNumber(formData.workExperience)) {
      newErrors.workExperience = 'Year of work experience must be a number';
    }

    if (!formData.isPaidWork) {
      newErrors.isPaidWork = 'Please select if your job is paid';
    }

    if (formData.workLocation.length === 0) {
      newErrors.workLocation = 'Please select at least one work location';
    }

    if (!formData.profession) {
      newErrors.profession = 'Please select your profession';
    }

    if (!formData.annualSalary) {
      newErrors.annualSalary = 'Annual salary is required';
    } else if (!validateNumber(formData.annualSalary)) {
      newErrors.annualSalary = 'Annual salary must be a number';
    }

    // Language validation - all IELTS scores required
    const ieltsScores = Object.values(formData.ielts);
    if (ieltsScores.some(score => !score)) {
      newErrors.ielts = 'Please provide all four IELTS scores';
    }

    // Additional options validation
    if (formData.investments === 'Yes') {
      if (!formData.investmentBudget) {
        newErrors.investmentBudget = 'Investment budget is required';
      } else if (!validateNumber(formData.investmentBudget)) {
        newErrors.investmentBudget = 'Investment budget must be a number';
      }

      if (!formData.netWorth) {
        newErrors.netWorth = 'Net worth is required';
      } else if (!validateNumber(formData.netWorth)) {
        newErrors.netWorth = 'Net worth must be a number';
      }
    }

    if (formData.startBusiness === 'Yes') {
      if (!formData.businessFunding) {
        newErrors.businessFunding = 'Business funding is required';
      } else if (!validateNumber(formData.businessFunding)) {
        newErrors.businessFunding = 'Business funding must be a number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const universityOptions = getUniversitiesByGraduationDate(formData.graduationDate);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6 text-[#414141] flex items-center">
        Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basics Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Basics</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                  errors.name ? 'border-[#e76f51]' : 'border-gray-300'
                }`}
                placeholder="Jane Smith"
              />
              {errors.name && <p className="text-[#e76f51] text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                  errors.age ? 'border-[#e76f51]' : 'border-gray-300'
                }`}
                placeholder="25"
              />
              {errors.age && <p className="text-[#e76f51] text-xs mt-1">{errors.age}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                  errors.email ? 'border-[#e76f51]' : 'border-gray-300'
                }`}
                placeholder="jane@email.com"
              />
              {errors.email && <p className="text-[#e76f51] text-xs mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>
          
          <div className="space-y-4">
            {/* Education Level */}
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Education Level
              </label>
              <select
                id="education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                  errors.education ? 'border-[#e76f51]' : 'border-gray-300'
                }`}
              >
                {educationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.education && <p className="text-[#e76f51] text-xs mt-1">{errors.education}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Graduation Date */}
              <div>
                <label htmlFor="graduationDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Graduation Date
                </label>
                <input
                  type="date"
                  id="graduationDate"
                  name="graduationDate"
                  value={formData.graduationDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853]"
                />
              </div>

              {/* University */}
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                  University
                  <span className="text-xs text-gray-500 ml-2">
                    Select if you graduated from a top-ranking university
                  </span>
                </label>
                <select
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853]"
                  disabled={!formData.graduationDate}
                >
                  <option value="">Select your university...</option>
                  {universityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {!formData.graduationDate && (
                  <p className="text-gray-500 text-xs mt-1">Please select graduation date first</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Experience Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Experience</h3>
          
          <div className="space-y-4">
            {/* Years of work experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="workExperience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Work Experience
                </label>
                <input
                  type="text"
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleChange}
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                    errors.workExperience ? 'border-[#e76f51]' : 'border-gray-300'
                  }`}
                  placeholder="Type..."
                />
                {errors.workExperience && <p className="text-[#e76f51] text-xs mt-1">{errors.workExperience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is your job paid?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPaidWork"
                      value="Yes"
                      checked={formData.isPaidWork === 'Yes'}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isPaidWork"
                      value="No"
                      checked={formData.isPaidWork === 'No'}
                      onChange={handleChange}
                      className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                    />
                    No
                  </label>
                </div>
                {errors.isPaidWork && <p className="text-[#e76f51] text-xs mt-1">{errors.isPaidWork}</p>}
              </div>
            </div>

            {/* Work location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Work Location
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {workLocationOptions.map(option => (
                  <label key={option.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="workLocation"
                      value={option.value}
                      checked={formData.workLocation.includes(option.value)}
                      onChange={handleChange}
                      className="h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.workLocation && <p className="text-[#e76f51] text-xs mt-1">{errors.workLocation}</p>}
            </div>

            {/* Profession */}
            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                What is your profession?
              </label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                  errors.profession ? 'border-[#e76f51]' : 'border-gray-300'
                }`}
              >
                {jobTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.profession && <p className="text-[#e76f51] text-xs mt-1">{errors.profession}</p>}
            </div>

            {/* Annual salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Annual Salary
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <select
                  name="salaryCurrency"
                  value={formData.salaryCurrency}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853]"
                >
                  {currencyOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="annualSalary"
                  value={formData.annualSalary}
                  onChange={handleChange}
                  className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                    errors.annualSalary ? 'border-[#e76f51]' : 'border-gray-300'
                  }`}
                  placeholder="Type..."
                />
              </div>
              {errors.annualSalary && <p className="text-[#e76f51] text-xs mt-1">{errors.annualSalary}</p>}
            </div>
          </div>
        </div>

        {/* Language Ability Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Language Ability</h3>
          
          <div>
            <div className="flex items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                IELTS Scores
              </label>
              <span className="ml-2 text-xs text-gray-500">
                You can predict your scores if you haven't taken the test
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['listening', 'speaking', 'reading', 'writing'].map(skill => (
                <div key={skill}>
                  <label className="block text-xs font-medium text-gray-600 mb-1 capitalize">
                    {skill}
                  </label>
                  <select
                    name={`ielts.${skill}`}
                    value={formData.ielts[skill]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#47b853]"
                  >
                    {ieltsScoreOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {errors.ielts && <p className="text-[#e76f51] text-xs mt-1">{errors.ielts}</p>}
          </div>
        </div>

        {/* Additional Options Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Options</h3>
          
          <div className="space-y-6">
            {/* Higher Education */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you consider have higher education in your potential immigration destination?
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="higherEducation"
                    value="Yes"
                    checked={formData.higherEducation === 'Yes'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="higherEducation"
                    value="No"
                    checked={formData.higherEducation === 'No'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  No
                </label>
              </div>
            </div>

            {/* Extraordinary Ability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you consider yourself have extraordinary ability or achievement?
              </label>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="extraordinaryAbility"
                    value="Yes"
                    checked={formData.extraordinaryAbility === 'Yes'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="extraordinaryAbility"
                    value="No"
                    checked={formData.extraordinaryAbility === 'No'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  No
                </label>
              </div>

              {formData.extraordinaryAbility === 'Yes' && (
                <div className="ml-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Tick what meet your achievement:
                  </p>
                  {extraordinaryAbilityOptions.map(option => (
                    <label key={option.value} className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        name="extraordinaryAchievements"
                        value={option.value}
                        checked={formData.extraordinaryAchievements.includes(option.value)}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Investments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you consider make investments in your potential immigration destination?
              </label>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="investments"
                    value="Yes"
                    checked={formData.investments === 'Yes'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="investments"
                    value="No"
                    checked={formData.investments === 'No'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  No
                </label>
              </div>

              {formData.investments === 'Yes' && (
                <div className="ml-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      How much is your investment fund budget?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <select
                        name="investmentCurrency"
                        value={formData.investmentCurrency || 'USD'}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853]"
                      >
                        {currencyOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="investmentBudget"
                        value={formData.investmentBudget}
                        onChange={handleChange}
                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                          errors.investmentBudget ? 'border-[#e76f51]' : 'border-gray-300'
                        }`}
                        placeholder="Type..."
                      />
                    </div>
                    {errors.investmentBudget && <p className="text-[#e76f51] text-xs mt-1">{errors.investmentBudget}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your net worth?
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <select
                        name="netWorthCurrency"
                        value={formData.netWorthCurrency || 'USD'}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853]"
                      >
                        {currencyOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="netWorth"
                        value={formData.netWorth}
                        onChange={handleChange}
                        className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                          errors.netWorth ? 'border-[#e76f51]' : 'border-gray-300'
                        }`}
                        placeholder="Type..."
                      />
                    </div>
                    {errors.netWorth && <p className="text-[#e76f51] text-xs mt-1">{errors.netWorth}</p>}
                  </div>
                </div>
              )}
            </div>

            {/* Start-up */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you consider start a business in your potential immigration destination?
              </label>
              <div className="flex space-x-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="startBusiness"
                    value="Yes"
                    checked={formData.startBusiness === 'Yes'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="startBusiness"
                    value="No"
                    checked={formData.startBusiness === 'No'}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 border border-gray-300 bg-white rounded focus:ring-2 focus:ring-[#47b853] checked:bg-[#ccdfc9] checked:border-[#3b8f6c] appearance-none relative after:content-[''] after:absolute after:left-[3px] after:top-[1px] after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-white after:rotate-45 after:opacity-0 checked:after:opacity-100"
                  />
                  No
                </label>
              </div>

              {formData.startBusiness === 'Yes' && (
                <div className="ml-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    How much you will fund your business?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <select
                      name="businessCurrency"
                      value={formData.businessCurrency || 'USD'}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853]"
                    >
                      {currencyOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="businessFunding"
                      value={formData.businessFunding}
                      onChange={handleChange}
                      className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#47b853] ${
                        errors.businessFunding ? 'border-[#e76f51]' : 'border-gray-300'
                      }`}
                      placeholder="Type..."
                    />
                  </div>
                  {errors.businessFunding && <p className="text-[#e76f51] text-xs mt-1">{errors.businessFunding}</p>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            className="bg-[#415d43] text-white px-8 py-3 rounded-md shadow hover:bg-[#709775] focus:outline-none focus:ring-2 focus:ring-[#333333] transition duration-150 font-medium"
          >
            Find Your Immigration Options
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm