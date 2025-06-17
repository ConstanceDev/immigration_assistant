import React, { useState } from 'react';
import { 
  educationOptions, 
  jobTypeOptions,
  currencyOptions,
  ieltsScoreOptions,
  workLocationOptions,
  workExperiencePoints,
  extraordinaryAbilityOptions,
  getUniversitiesByGraduationDate
} from '../data/immigrationRequirements';

const ProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    //Basics
    name: '',
    age: '',
    email: '',

    //Education
    education: '',
    graduationDate: '',
    university: '',

    //Professional Experience
    workExperience: '',
    isPaidWork: '',
    workLocation: '',
    profession: '',
    salaryCurrency: '',
    annualSalary: '',
    
    //Lanaguage Ability
    ielts: {
      listening: '',
      speaking: '',
      reading: '',
      writing: ''
    },

    //Additional Options
    higherEducation: null,
    extraordinaryAbility: null,
    extraordinaryAchievement: [],
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
    const { name, value, type, checked } = event.target;

    //Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (name.startsWith('ielts.')) {
      const skill = name.split('')[1];
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
        setFormData (prev => ({
          ...prev,
          workLocation: prev.workLocation.filter(loc => loc !== value)
        }));
      }
    } else if (name === 'extraordinaryAchievements') {
      if (checked) {
        setFormData (prev => ({
          ...prev,
          extraordinaryAchievements: [...prev.extraordinaryAchievement, value]
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

    //Basics validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required!';
    }

    if (!formData.age) {
      newErrors.age = 'Age is required!';
    } else if (!validateNumber(formData.age)) {
      newErrors.age = 'Age must be a number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required!';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    //Education validation
    if (!formData.education) {
      newErrors.education = 'Education level is required!';
    }

    //Professional Experience validation
    if (!formData.workExperience) {
      newErrors.workExperience = 'Years of work experience is required!';
    } else if (!validateNumber(formData.workExperience)) {
      newErrors.workExperience = 'Years of work experience must be a number';
    }

    if (!formData.isPaidWork) {
      newErrors.isPaidWork = 'please select if your job is paid';
    }

    if (!formData.workLocation.length === 0) {
      newErrors.workLocation = 'Please select at least one work location';
    }

    if (!formData.profession) {
      newErrors.profession = 'Please select your profession';
    }

    if (!formData.annualSalary) {
      newErrors.annualSalary = 'Annual salary is required!';
    } else if (validateNumber(formData.annualSalary)) {
      newErrors.annualSalary = 'Annual salary must be a number';
    }

    //Language Validation
    const ieltsScores = Object.values(formData.ielts);
    if (ieltsScores.some(score => !score)) {
      newErrors.ielts = 'Please provide all all IELTS scores';
    }

    //Additional options validation
    if (formData.investments === 'Yes') {
      if (!formData.investmentBudget) {
        newErrors.investmentBudget = 'Investment budget is required!';
      } else if (!validateNumber(formData.investmentBudget)) {
        newErrors.investmentBudget = 'Investment budget must be a number';
      }

      if (!formData.netWorth) {
        newErrors.netWorth = 'Net worth is required!';
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
      onsubmit(formData);
    }
  };

  const universityOptions = getUniversitiesByGraduationDate(formData.graduationDate);

  return (
    <div classname="bg-white rounded-lg shadow-md p-6 -mb-80">
      <h2 className="text-xl font-semibold mb-6 text-blue-800 flex items-center">
        <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
          📋
        </span>
        Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Section */}
        <div className="border-b pb-6">

        </div>
      </form> 
    </div>
  )
};

export default ProfileForm;