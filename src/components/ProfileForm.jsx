import React, { useState } from 'react';
import { 
  educationOptions, 
  jobTypeOptions,
  currencyOptions,
  ieltsScoreOptions,
  workLocationOptions,
  extraordinaryAbilityOptions,
  getUniversitiesByGraduationDate
} from '../data/immigrationPrograms';
import { workExperiencePoints } from '../data/immigrationRequirements';


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
    }
  }

 
};

export default ProfileForm;