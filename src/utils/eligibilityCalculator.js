import {
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
      if (!checkExtraodinayAbility(
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

// convert CEFR level to numeric value for comparison & check
const cefrToNumeric = (cefrlevel) => {
  const cefrMap = {
    'Below A1': 0,
    'A1': 1,
    'A2': 2,
    'B1': 3,
    'B2': 4,
    'C1': 5,
    'C2': 6
  };
  return cefrMap[cefrlevel] || 0;
};

//Handle multiple types of lanaguage requirement, especially in Canadian programs
const checkLanguageRequirement = (clbResult, cefrLevel, languageRequirement) => {
  if (!languageRequirement) return true;

  const { standard, level, levelToPoints, levelToSkill } = languageRequirement;

// Type 1: Normal format - single minimum CLB level
  if (standard === 'CLB') {
    if (typeof level === 'string') { // Handle format like 'CLB7' or just '7'
      const requiredCLB = parseInt(level.replace('CLB', ''));
      return clbResult.overall >= requiredCLB;
    }
    // Type 2: levelToPoints format - used in selectionFactors (points-based)
    if (levelToPoints) {
      const lowestRequiredLevel = Math.min(
        ...Object.keys(levelToPoints).map(key => parseInt(key.replace('CLB', '')))
      );
      return clbResult.overall >= lowestRequiredLevel;
    }
    // Type 3: levelToSkill format - different CLB requirements for each skill
    if (levelToSkill) {
      const requiredLevels = {
        speaking: parseInt(levelToSkill.speaking?.replace('CLB', '') || '0'),
        listening: parseInt(levelToSkill.listening?.replace('CLB', '') || '0'),
        reading: parseInt(levelToSkill.reading?.replace('CLB', '') || '0'),
        writing: parseInt(levelToSkill.writing?.replace('CLB', '') || '0')
      };

      //check if user meets each individual skill requirement
      return (
        clbResult.individual.speaking >= requiredLevels.speaking &&
        clbResult.individual.listening >= requiredLevels.listening &&
        clbResult.individual.reading >= requiredLevels.reading && 
        clbResult.individual.writing >= requiredLevels.writing
      );
    }
  }

  if (standard === 'CEFR') {
    if (typeof level === 'string') {
    // Handle format like 'B1', 'B2', etc. - check if user meets minimum
    const requiredCefrNumeric = cefrToNumeric(level);
    const userCefrNumeric = cefrToNumeric(cefrLevel);
    return userCefrNumeric >= requiredCefrNumeric;
    }
  }
  
  return true;
};

/**
 * Check salary requirements with range support
 */
const checkSalaryRequirement = (userSalary, salaryCurrency, workExperienceReq) => {
  if (!workExperienceReq.salary) return true;

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
 * Check Worker Programs (both Skilled Worker and High Professional)
 */
const checkWorkerPrograms = (programs, formData) => {
  const workerPrograms = programs.filter(p => 
    ['Skilled Worker', 'High Professional'].includes(p.category)
);

const eligiblePrograms = [];
const clbResult = calculateCLBLevel(formData.ielts || {});
const cefrLevel = calculateCEFRLevel(formData.ielts || {});

workerPrograms.forEach(program => {
  if (!program || !program.requirements) {
    console.warn('Invalid program data: ', program);
    return;
  }

  const req = program.requirements;
  let eligible = true;
  let points = 0;
  let notes = [];

  //Age requirements
  if (program.isPointsBased && req.minimumRequirements?.age) {
    const userAge = parseInt(formData.age);
    const { min, max } = req.minimumRequirements.age;
    if (userAge < min || userAge > max) {
      eligible = false;
      notes.push(`Age must be between ${min} and ${max}`);
    }
  }

  //Education requirements
  if (program.isPointsBased) {
    // Points-based programs: check minimumRequirements
    if (req.minimumRequirements?.education?.level || req.minimumRequirements?.education?.level) {
      const educationLevel = req.minimumRequirements?.education?.level || req.minimumRequirements?.eduction?.level;
      if (!checkEducationRequirement(formData.education, educationLevel)) {
        eligible = false;
        notes.push('Education requirement not met');
      }
    }
  } else {
    //Non-points-based programs: check direct requirements
    if (req.education?.level) {
      if (!checkEducationRequirement(formData.education, req.education.level)) {
        eligible = false;
        notes.push('Education requirement not met');
      }
    }
  }

  //Check options for programs like EB-2A
  if (req.points) {
    let meetsAnyOption = false;

    if (req.options.option) {
      const option1Met = checkEducationRequirement(formData.education, req.options.option1.education?.level);
      if (option1Met) meetsAnyOption = true;
    }

    if (req.options.option2 && !meetsAnyOption) {
      const educationMet = checkEducationRequirement(formData.education, req.options.option2?.education?.level);
      const experienceMet = parseInt(formData.workExperience) >= (req.options.option2.workExperience?.yearsOfWork || 0);
      if (educationMet && experienceMet) meetsAnyOption = true;
    }

    if (!meetsAnyOption) {
      eligible = false;
      notes.push('Does not meet any of the required options');
    }
  }

  //work experience requirements
  if (program.isPointsBased) {
    //Points-based programs: check minimumRequirements
    if (req.minimumRequirements?.workExperience?.yearsOfWork) {
      if (parseInt(formData.workExperience) < req.minimumRequirements.workExperience.yearsOfWork) {
        eligible = false;
        notes.push(`Minimum ${req.minimumRequirements.workExperience.yearsOfWork} years of work experience required`);
      }
    }

    //Paid work requirement for points-based programs
    if (req.minimumRequirements?.workExperience?.isPaidWork && formData.isPaidWork !== 'yes') {
      eligible = false;
      notes.push('Paid work experience required');
    }

    //Work location requirement for points-based programs
    if (req.minimumRequirements?.workExperience?.location) {
      if (!checkWorkLocationRequirement(formData.workLocation, req.minimumRequirements.workExperience.location, program.country)) {
        eligible = false;
        notes.push('Work location requirement not met');
      }
    }
  } else {
    // Non-points-based programs: check direct requirements
    if (req.workExperience?.yearsOfWork) {
      if (parseInt(formData.workExperience) < req.workExperience.yearsOfWork) {
        eligible = false;
        notes.push(`Minimum ${req.workExperience.yearsOfWork} years of work experience required`);
      }
    }

    //Paid work requirement for non-points-based programs
    if (req.workExperience.isPaidWork && formData.isPaidWork !== 'yes') {
      eligible = false;
      notes.push('Paid work experience required');
    }

    //Work location requirement for non-points-based programs
    if (req.workExperience?.location) {
      if (!checkWorkLocationRequirement(formData.workLocation, req.workExperience.location, program.country)) {
        eligible = false;
        notes.push('Work location requirement not met');
      }
    }
  }
  // Language requirements (updated to handle standardised format and Canadian variants)
  if (program.isPointsBased) {
    //Points-based programs: check minimumRequirements
    if (req.minimumRequirements?.language?.english) {
      if (!checkLanguageRequirement(clbResult, cefrLevel, req.minimumRequirements.language.english)) {
        eligible = false;
        const langReq = req.minimumRequirements.language.english;
        if (langReq.levelToSkill) {
          //Type 3: Individual skill requirements
          const skillReqs = Object.entries(langReq.levelToSkill)
            .map(([skill, level]) => `${skill} : ${level}`)
            .join(', ');
          notes.push(`English language requirements not met - required: ${skillReqs}`);
        } else if (langReq.level) {
          //Type 1: Single minimum level
          notes.push(`English language requirement not met - minimum ${langReq.level} required`);
        } else {
          notes.push(`English language requirement not met`);
        }
      }
    }
  }

  //Salary requirements
  if (req.workExperience?.salary) {
    if (!checkSalaryRequirement(formData.annualSalary, formData.salaryCurrency, req.workExperience)) {
      eligible = false;
      notes.push(`Salary requirement not met`);
    }
  }

  //Check salary requirements for options (like Ireland CSEP)
  if (req.options) {
    let salaryMet = true;
    if (req.options.option1?.workExperience?.salary) {
      if (!checkSalaryRequirement(formData.annualSalary, formData.salaryCurrency, req.options.option1.workExperience)) {
        salaryMet = false;
      }
    }
    if (req.options.option2?.workExperience?.salary && !salaryMet) {
      if (!checkSalaryRequirement(formData.annualSalary, formData.salaryCurrency, req.options.option2.workExperience)) {
        salaryMet = false;
      }
    }
    if (!salaryMet) {
      eligible = false;
      notes.push(`Salary requirement not met for any option`);
    }
  }
  // Points calculation for Canadian programs ONLY AFTER meeting minimum requirements
  if (program.isPointsBased && eligible) {
    if (req.minimumRequirements && req.selectionFactors) {
      //Age points
      if (req.selectionFactors.age && agePoints[program.id.includes('fswp') ? 'federalSkilledWorker' : 'selfEmployed']) {
        const agePointsTable = agePoints[program.id.includes('fswp') ? 'federalSkilledWorker' : 'selfEmployed'];
        points += agePointsTable[parseInt(formData.age)] || 0;
      }

      //Education points
      if (req.selectionFactors.education && educationPoints[program.id.includes('fswp') ? 'federalSkilledWorker' : 'selfEmployed']) {
        const educationPointsTable = educationPoints[program.id.includes('fswp') ? 'federalSkilledWorker' : 'selfEmployed'];
        points += educationPointsTable[formData.education] || 0;
      }

      //Work experience points
      if (req.selectionFactors.workExperience && workExperiencePoints[program.id.includes('fswp') ? 'federalSkilledWorker' : 'selfEmployed']) {
        const workExperiencePointsTable = workExperiencePoints[program.id.includes('fswp') ? 'federalSkilledWorker' : 'selfEmployed'];
        points += workExperiencePointsTable[parseInt(formData.workExperience)] || 0;
      }

      //Language points - Updated for Canadian programs with levelToPoints format
      if (req.selectionFactors.language?.english) {
        const langReq = req.selectionFactors.language.english;

        //Handle levelToPoints format
        if (langReq.levelToPoints) {
          const userCLBKey = `CLB${clbResult.overall}`;
          const languagePoints = langReq.levelToPoints[userCLBKey] || 0;
          points += languagePoints;
        }
      }
      //Check if meets minmum points
      if (points < req.selectionFactors.minPointsRequired) {
        eligible = false;
        notes.push(`Minimum ${req.selectionFactors.minPointsRequired} points required for ${program.name}, you have ${points}`);
      }
    }
  }
  
  if (eligible) {
    eligiblePrograms.push({
      ...program,
      points: program.isPointsBased ? points : "Not a Points-based program",
      notes: notes.length > 0 ? notes : null
    });
  }
});

return eligiblePrograms;
};

/**
 * ==========================================
 * MAIN ELIGIBILITY CALCULATION FUNCTION
 * ==========================================
 */
export const calculateEligibility = (formData) => {
  //Calculate lanaguage standards
  const clbResult = calculateCLBLevel(formData.ielts || {});
  const cefrLevel = calculateCEFRLevel(formData.ielts || {});

  //Combine all programs from different countries
  const allPrograms = [
    ...canadaPrograms,
    ...ukPrograms,
    ...usaPrograms,
    ...irelandPrograms
  ];

  let eligiblePrograms = [];

  //Step 1: Check Additional Options Programs 
  // (Graudate, Investments, Entrepreneur, Extraodinary Ability)
  eligiblePrograms = eligiblePrograms.concat(checkGraduateStudentPrograms(allPrograms, formData));
  eligiblePrograms = eligiblePrograms.concat(checkEntrepreneurPrograms(allPrograms, formData));
  eligiblePrograms = eligiblePrograms.concat(checkInvestmentPrograms(allPrograms, formData));
  eligiblePrograms = eligiblePrograms.concat(checkExtraordinaryAbilityPrograms(allPrograms, formData));

  //Step 2: Check Worker Programs (Skilled Worker, High Professional)
  eligiblePrograms = eligiblePrograms.concat(checkWorkerPrograms(allPrograms, formData));

  //Add language calculation results to all eligible programs
  eligiblePrograms = eligiblePrograms.map(program => ({
    ...program,
    userCLB: clbResult.overall,
    userCEFR: cefrLevel
  }));

  //Sort by country and then by points
  eligiblePrograms.sort((a, b) => {
    if (a.country === b.country) {
      return (b.points || 0) - (a.points || 0);
    }
    return a.country.localeCompare(b.country);
  });

  return eligiblePrograms;
};