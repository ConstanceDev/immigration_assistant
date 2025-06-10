import {
  languageStandards,
  educationPoints,
  agePoints,
  workExperiencePoints,
  topRankingUniversities
} from '../data/immigrationRequirements';

// Import all country program data
import canadaPrograms from '../data/popularImmigrationCountries/canada';
import usaPrograms from '../data/popularImmigrationCountries/ameraica';
import ukPrograms from '../data/popularImmigrationCountries/unitedKingdom';
import irelandPrograms from '../data/popularImmigrationCountries/ireland';

/**
 * Currency Conversion rates 
 */
//TODO build live rates later versions

const CURRENCY_RATES = {
  'USD': { USD: 1, GBP: 0.79, EUR: 0.93, CAD: 1.35, CNY: 7.25 },
  'GBP': { USD: 1.27, GBP: 1, EUR: 1.17, CAD: 1.71, CNY: 9.19 },
  'EUR': { USD: 1.08, GBP: 0.85, EUR: 1, CAD: 1.46, CNY: 7.84 },
  'CAD': { USD: 0.74, GBP: 0.58, EUR: 0.68, CAD: 1, CNY: 5.37 },
  'CNY': { USD: 0.14, GBP: 0.11, EUR: 0.13, CAD: 0.19, CNY: 1 }
};

/**
 * Currency Converter
 */
const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  const rate = CURRENCY_RATES[fromCurrency]?.[toCurrency] || 1;
  return Math.round(amount * rate * 100) / 100;
};

/**
 * Calculate CLB level from IELTS scores
 */
const calculateCLBLevel = (ieltsScores) => {
  const { listening, speaking, reading, writing } = ieltsScores;

  const getCLBFromIELTS = (score, skill) => {
    const numScore = parseFloat(score);
    if (!numScore) return 0;

    //CLB conversion based on IELTS scores
    if (skill === 'listening') {
      if (numScore >= 8.5) return 10;
      if (numScore >= 8) return 9;
      if (numScore >= 7.5) return 8;
      if (numScore >= 6) return 7;
      if (numScore >= 5.5) return 6;
      if (numScore >= 5) return 5;    
      if (numScore >= 4.5) return 4;
      return 4;
    } else if (skill === 'speaking') {
      if (numScore >= 7.5) return 10;
      if (numScore >= 7) return 9;
      if (numScore >= 6.5) return 8;
      if (numScore >= 6) return 7;
      if (numScore >= 5.5) return 6;
      if (numScore >= 5) return 5;
      if (numScore >= 4) return 4;
      return 4;
    } else if (skill === 'reading') {
      if (numScore >= 8) return 10;
      if (numScore >= 7) return 9;
      if (numScore >= 6.5) return 8;
      if (numScore >= 6) return 7;
      if (numScore >= 5) return 6;
      if (numScore >= 4) return 5;
      if (numScore >= 3.5) return 4;
      return 4;
    } else if (skill === 'writing') {
      if (numScore >= 7.5) return 10;
      if (numScore >= 7) return 9;
      if (numScore >= 6.5) return 8;
      if (numScore >= 6) return 7;
      if (numScore >= 5.5) return 6;
      if (numScore >= 5) return 5;
      if (numScore >= 4) return 4;
      return 4;
    }
    return 0;
  };

  const clbLevels = {
    listening: getCLBFromIELTS(listening, 'listening'),
    speaking: getCLBFromIELTS(speaking, 'speaking'),
    reading: getCLBFromIELTS(reading, 'reading'),
    writing: getCLBFromIELTS(writing, 'writing')
  };

  const overallCLB = Math.min(...Object.values(clbLevels));

  return { individual: clbLevels, overall: overallCLB };
};

/**
 * Calculate CEFR level from IELTS scores
 */
const calculateCEFRLevel = (ieltsScores) => {
  const { listening, speaking, reading, writing } = ieltsScores;
  const scores = [listening, speaking, reading, writing].map(s => parseFloat(s) || 0);
  const average = scores.reduce((sum, score) => sum + score, 0) / 4;

  // CEFR mapping based on average IELTS score
  if (average >= 8.5) return 'C2';
  if (average >= 7) return 'C1';
  if (average >= 5) return 'B2';
  if (average >= 4) return 'B1';
  if (average >= 3) return 'A2';
  if (average >= 2) return 'A1';
  return 'Below A1';
};

/**
 * Check top universities for UK HPI Visa
 */
const checkUniversityEligibility = (universityName, graduationDate) => {
  if (!universityName || !graduationDate) return false;

  const gradDate = new Date(graduationDate);
  const dateRanges = [
    { key: '2024-11-01_2025-10-31', start: new Date('2024-11-01'), end: new Date('2025-10-31') },
    { key: '2023-11-01_2024-10-31', start: new Date('2023-11-01'), end: new Date('2024-10-31') },
    { key: '2022-11-01_2023-10-31', start: new Date('2022-11-01'), end: new Date('2023-10-31') },
    { key: '2021-11-01_2022-10-31', start: new Date('2021-11-01'), end: new Date('2022-10-31') },
    { key: '2020-11-01_2021-10-31', start: new Date('2020-11-01'), end: new Date('2021-10-31') },
    { key: '2019-11-01_2020-10-31', start: new Date('2019-11-01'), end: new Date('2020-10-31') }
  ];

  const matchingRange = dateRanges.find(range => 
    gradDate >= range.start && gradDate <= range.end
  );
  if (!matchingRange) return false;

  const eligibleUniversities = topRankingUniversities[matchingRange.key] || [];
  return eligibleUniversities.some(uni => 
    uni.name.toLowerCase() === universityName.toLowerCase()
  );
};

/**
 * check work location
 */
const checkWorkLocationRequirement = (userLocations, programLocation, programCountry) => {
  if (!programLocation || programLocation.length === 0) return true;

  const hasLocal = programLocation.includes('local');
  const hasAbroad = programLocation.includes('abroad');

  if (hasLocal && hasAbroad) return true; //Any location is fine
  if (hasLocal) {
    return userLocations.includes(programCountry);
  } //Must have work experience in the program's country

  if (hasAbroad) {
    // Must have work experience NOT in the program's country
    return userLocations.some(loc => loc !== programCountry);
  }

  return true;
};

/**
 * Check extraodinary ability requirements
 */
const checkExtraodinayAbility = (userAchievements, requiredOptions, minimumRequired) => {
  if (!requiredOptions || !minimumRequired) return true;

  const matchingAchievements = userAchievements.filter(achievement =>
    requiredOptions.includes(achievement)
  );

  return matchingAchievements.length >= minimumRequired;
};

/**
 * ==========================================
 * STEP 1: CHECK ADDITIONAL OPTIONS PROGRAMS
 * ==========================================
 */

/**
 * Check Graduate/Student programs
 */
const checkGraduateStudentPrograms = (programs, formData) => {
  if (!formData.higherEducation) return [];

  const graduatePrograms = programs.filter(p => p.category === 'Graduate/Student');
  const eligiblePrograms = [];

  graduatePrograms.forEach(program => {
    let eligible = true;
    let notes = [];

    //For UK HPI visa - check university eligibility
    if (program.id === 'uk-hpi') {
      const req = program.requirements;
      
      //check education level
      if (req.education?.level && !req.education.level.includes(formData.education)) {
        eligible = false;
        notes.push('Education level requirement not met');
      }

      //Check University eligibility
      if (req.education?.university && !checkUniversityEligibility(formData.university, formData.graduationDate)) {
        eligible = false;
        notes.push('Must have graduated from eligible top-ranking university within last 5 years');
      }
    }

    if (eligible) {
      eligiblePrograms.push({
        ...program,
        points: 0,
        notes: notes.length > 0 ? notes : null
      });
    }
  });

  return eligiblePrograms;
};

/**
 * Check Investment programs
 */
const checkInvestmentPrograms = (programs, formData) => {
  if (!formData.investments) return [];

  const investmentPrograms = programs.filter(p => p.category === 'Investment');
  const eligiblePrograms = [];

  investmentPrograms.forEach(program => {
    let eligible = true;
    let notes = [];
    const req = program.requirements;

    //check investment budget requirement
    if (req.investmentBudget?.minAmount) {
      const convertedInvestment = convertCurrency(
        parseFloat(formData.investmentBudget) || 0,
        formData.investmentCurrency,
        req.investmentBudget.currency || 'USD'
      );

      if (convertedInvestment < req.investmentBudget.minAmount) {
        eligible = false;
        notes.push(`Minimum investment of ${req.investmentBudget.currency || 'USD'} ${req.investmentBudget.minAmount.toLocaleString()} is not met`);
      }
    }

    // Check net worth requirement
    if (req.netWorth?.minNetWorth) {
      const convertedNetWorth = convertCurrency(
        parseFloat(formData.netWorth) || 0,
        formData.netWorthCurrency,
        req.netWorth.currency || 'USD'
      );
      
      if (convertedNetWorth < req.netWorth.minNetWorth) {
        eligible = false;
        notes.push(`Minimum net worth of ${req.netWorth.currency || 'USD'} ${req.netWorth.minNetWorth.toLocaleString()} required`);
      }
    }

    if (eligible) {
      eligiblePrograms.push({
        ...program,
        points: 0,
        notes: notes.length > 0 ? notes : null
      });
    }
  });

  return eligiblePrograms;
};

/**
 * Check Entrepreneur programs
 */
const checkEntrepreneurPrograms = (programs, formData) => {
  if (!formData.startBusiness) return [];

  const entrepreneurPrograms = programs.filter(p => p.category === 'Entrepreneur');
  const eligiblePrograms = [];

  entrepreneurPrograms.forEach(program => {
    let eligible = true;
    let notes = [];
    const req = program.requirements;

    //check business funding requirements
    if (req.fundBudget?.miniFund) {
      const convertedFunding = convertCurrency(
        parseFloat(formData.businessFunding) || 0,
        formData.businessCurrency,
        req.fundBudget.currency || 'USD'
      );

      if (convertedFunding < req.fundBudget.miniFund) {
        eligible = false;
        notes.push(`Minimum business funding of ${req.fundBudget.currency || 'USD'} ${req.fundBudget.miniFund.toLocaleString()} required`);
      }
    }

    // Check language requirements (some entrepreneur programs have language requirements)
    if (req.language?.english) {
      const clbResult = calculateCLBLevel(formData.ielts || {});
      const requiredCLB = parseInt(req.language.english.replace?.('CLB', '') || "0");

      if (clbResult.overall < requiredCLB) {
        eligible = false;
        notes.push(`Minimum CLB ${requiredCLB} English language requirement not met`);
      }
    }

    if (eligible) {
      eligiblePrograms.push({
        ...program,
        points: 0,
        notes: notes.length > 0 ? notes : null
      });
    }
  });

  return eligiblePrograms;
};

/**
 * Check Extraordinary Ability programs
 */
const checkExtraordinaryAbilityPrograms = (programs, formData) => {
  if (!formData.extraordinaryAbility) return [];

  const extraordinaryPrograms = programs.filter(p => p.category === 'Extraordinary Ability');
  const eligiblePrograms = [];

  extraordinaryPrograms.forEach(program => {
    let eligible = true;
    let notes = [];
    const req = program.requirements;

    //check extraodinary ability requirements
    if (req.extraordinaryAbility) {
      if (!checkExtraordinaryAbility(
        formData.extraordinaryAchievements || [],
        req.extraordinaryAbility.requiredOptions,
        req.extraordinaryAbility.minimumRequired
      )) {
        eligible = false;
        notes.push(`Must meet at least ${req.extraordinaryAbility.minimumRequired} extraordinary ability criteria`);
      }
    }

    //check work experience for programs that require it (like EB-1B)
    if (req.workExperience?.yearsOfWork) {
      if (parseInt(formData.workExperience) < (req.workExperience.yearsOfWork)) {
        eligible = false;
        notes.push(`Minimum ${req.workExperience.yearsOfWork} years of work experience required`);
      }
    }

    if (eligible) {
      eligiblePrograms.push({
        ...program,
        points: 0,
        notes: notes.length > 0 ? notes : null
      });
    }
  });

  return eligiblePrograms;
};

/**
 * ==========================================
 * STEP 2: CHECK SKILLED WORKER PROGRAMS
 * ==========================================
 */

/**
 * Check if work location matches program requirements
 */

const checkWorkLocationRequirement = (userLocations, programLocation, programCountry) => {
  if (!programLocation || programLocation.length === 0) return true;

  const hasLocal = programLocation.includes('local');
  const hasAbroad = programLocation.includes('Abroad');

  if (hasLocal && hasAbroad) return true; //Any location is fine

  if (hasLocal) {
    return userLocations.includes(programCountry);
  }

  if (hasAbroad) {
    return userLocations.some(loc => loc !== programCountry);
  }

  return true;
}

/**
 * Check education requirements
 */

const checkEducationRequirement = (userEducation, requiredEducation) => {
  if (!requiredEducation) return true;

  if (Array.isArray(requiredEducation)) {
    return requiredEducation.includes(userEducation);
  }
  // If required education is a single value, user's education must match it
  return userEducation === requiredEducation;
};

/**
 * Check language requirements
 * Currently CLB & CEFR standards
 */
const checkLanguageRequirement = (clbResult, cefrLevel, languageRequirement) => {
  if (!languageRequirement) return true;

  const { standard, level } = languageRequirement;

  if (standard === 'CLB') {
    if
  }
}
