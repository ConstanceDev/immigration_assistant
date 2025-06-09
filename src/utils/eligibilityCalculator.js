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
  'USD' : {USD: 1, GBP: 0.79, EUR: 0.93, CAD: 1.35, CNY: 7.25 },
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

return { individual: clbLevels, overall: overallCLB};
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

const checkEducationRequirement = (userEducation, requiredEducation) => {
  if (!requiredEducation) return true;

  if (Array.isArray(requiredEducation)) {
    return requiredEducation.includes(userEducation);
  }

  return userEducation === requiredEducation;
};

/**
 * check language requirements
 */

const checkLanguageRequirement = (userCLB, requiredLevel) => {
  if (!requiredLevel) return true;

  if (typeof requiredLevel === 'string') {
    const requiredCLB = parseInt(requiredLevel.replace('CLB', ''));
    return userCLB >= requiredCLB;
  }
  return true;
};

/**
 * Check salary requirement
 */

const checkSalaryRequirement = (userSalary, salaryCurrency, workExperienceReq) => {
  if(!workExperienceReq?.salary) return true;

  const salaryReq = workExperienceReq.salary;
  const convertedSalary = convertCurrency(
    parseFloat(userSalary) || 0,
    salaryCurrency,
    salaryReq.currency || 'USD'
  );

  if (salaryReq.min && convertedSalary < salaryReq.min) return false;
  if (salaryReq.max && convertedSalary >= salaryReq.max) return false;

  return true;
};

/**
 * Check investment requirements
 */
const checkInvestmentRequirement = (userInvestment, investmentCurrency, investmentBudgetReq) => {
  if (!userInvestment?.minAmount) return true;

  const convertedInvestment = convertCurrency(
    parseFloat(userInvestment) || 0,
    investmentCurrency,
    investmentBudgetReq.currency || 'USD'
  );

  return convertCurrency >= investmentBudgetReq.minAmount;
};

/**
 * Check business funding requirements
 */
const checkBusinessFundingRequirement = (userFunding, fundingCurrency, fundBudgetReq) => {
  if(!fundBudgetReq?.miniFund) return true;

  const convertedFudning = convertCurrency(
    parseFloat(userFunding) || 0,
    fundingCurrency,
    fundBudgetReq.currency || 'USD'
  );

  return convertedFudning >= fundBudgetReq.miniFund;
};


/**
 * Check net worth requirements
 */

const checkNetWorthRequirement = (userNetWorth, netWorthCurrency, netWorthReq) => {
  if(!netWorthReq?.minNetWorth) return true;

  const convertedNetWorth = convertCurrency(
    parseFloat(userNetWorth) || 0,
    netWorthCurrency,
    netWorthReq.currency || 'USD'
  );

  return convertedNetWorth >= netWorthReq.minNetWorth;
};

/**
 * Main eligibility calculation function
 */

export const calculateEligibility = (formData) => {

  let eligiblePrograms = [];

  //Calculate lanaguage levels
  const clbResult = calculateCLBLevel(formData.ielts);
  const cefrLevel = calculateCEFRLevel(formData.ielts);

  // Combine all programs from different countries
  const allPrograms = [
    ...canadaPrograms,
    ...usaPrograms,
    ...ukPrograms,
    ...irelandPrograms
  ];

  allPrograms.forEach(program => {
    if (!program || !program.requirements) {
      console.warn('Invalid program data: ', program);
      return;
    }

    const req = program.requirements;
    let eligible = true;
    let points = 0;
    let notes = [];

    // Check category-based filtering first
    if (program.category === 'Graduate/Student' && !formData.higherEducation) {
      return; // Skip if user doesn't want local education
    }

    if (program.category === 'Investment' && !formData.investment) {
      return; // Skip if user doesn't want to invest
    }

    if (program.category === 'Entrepreneur' && !formData.startBusiness) {
      return; // Skip if user doesn't want to start business
    }

    if (program.category === 'Extraordinary Ability' && !formData.extraordinaryAbility) {
      return;
    }

  }

);

};