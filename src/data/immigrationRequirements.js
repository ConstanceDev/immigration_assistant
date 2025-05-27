/**
 * Immigration Requirements and Standards
 * Contains shared requirements and standards used across different countries and programs
 */

/**
 * Language Standards
 */

export const languageStandards = {
// CLB (Canadian Language Benchmarks) based on IELTS scores
   CLB: {
    CLB10: { listening: [8, 10], speaking: [7.5, 10], reading: [8.5, 10], writing: [7.5, 10] },
    CLB9: { listening: 7, speaking: 7, reading: 8, writing: 7 },
    CLB8: { listening: 6.5, speaking: 6.5, reading: 7.5, writing: 6.5 },
    CLB7: { listening: 6, speaking: 6, reading: 6, writing: 6 },
    CLB6: { listening: 5, speaking: 5.5, reading: 5.5, writing: 5.5 },
    CLB5: { listening: 4, speaking: 5, reading: 5, writing: 5 },
    CLB4: { listening: 3.5, speaking: 4, reading: 4.5, writing: 4 }
  },
  //Australia Standards
  CEFR: {
    Superior: { listening: [8, 10], speaking: [8, 10], reading: [8, 10], writing: [8, 10] },
    Proficient: { listening: [7, 7.5], speaking: [7, 7.5], reading: [7, 7.5], writing: [7, 7.5] },
    Competent: { listening: [6, 6.5], speaking: [6, 6.5], reading: [6, 6.5], writing: [6, 6.5] },
    Vocational: { listening: [5,5.5], speaking: [5,5.5], reading: [5,5.5], writing: [5,5.5] },
    Functional: { 
      calculation: 'average',
      averageScore: 4.5,
      notes: 'Average band score of at least 4.5 based on the 4 test components'
    } // TODO build a calculation for lanaguage ability
  //TODO only specific points can be taken,set options not input box  https://manaimmigration.com/tools/clb-score-calculator/#Description-of-the-table-fields
  }
};

/**
 * Education Points 
 * Include programs: 
 * Canada: Self-Employed Persons and EE - Federal Skilled Workers
 */

export const educationPoints = {
  //Canada: Federal Skilled Worker Program
  federalSkilledWorker: {
    doctorate: 25,
    masters: 23,
    professionalDegree:23,
    twoBachelors: 22,
    twoCertificates: 22,
    threeDiploma: 0, // Not applicable
    bachelorsThreeYear: 21,
    twoYearDiploma: 19,
    oneYearThirteen: 15,
    oneYearTwelve: 15,
    secondary: 5,
    belowSecondary: 0
  },
  //Canada: Self-Employed
  selfEmployed: {
    doctorate: 25,
    masters: 25,
    professionalDegree: 0, // Not applicable
    twoBachelors: 22,
    twoCertificates: 0, // Not applicable
    threeDiploma: 22,
    bachelorsThreeYear: 20,
    twoYearDiploma: 20,
    oneYearThirteen: 15,
    oneYearTwelve: 12,
    secondary: 5,
    belowSecondary: 0
  },
};

// Education options for the select input
export const educationOptions = [
  { value: '', label: 'Select level' },
  { value: 'belowSecondary', label: 'Below secondary education' },
  { value: 'secondary', label: 'Secondary school (high school diploma)' },
  { value: 'oneYearTwelve', label: 'One-year degree, diploma, certificate or apprenticeship (equivalent to at least 12 years of full-time study)' },
  { value: 'oneYearThirteen', label: 'One-year degree, diploma, certificate or apprenticeship (equivalent to at least 13 years of full-time study)' },
  { value: 'twoYearDiploma', label: 'Two-year degree, diploma, certificate or apprenticeship' },
  { value: 'bachelorsThreeYear', label: 'University degree of three or more years at the Bachelor\'s level' },
  { value: 'threeDiploma', label: 'Three-year diploma, trade certificate or apprenticeship' },
  { value: 'twoCertificates', label: 'Two or more certificates, diplomas' },
  { value: 'twoBachelors', label: 'Two or more university degrees at the Bachelor\'s level' },
  { value: 'professionalDegree', label: 'Professional degree needed to practice in a licensed profession' },
  { value: 'masters', label: 'University degree at the Master\'s level' },
  { value: 'doctorate', label: 'University degree at the Doctoral (PhD) level' }
];


/**
 * Age Points
 */

export const agePoints = {
  federalSkilledWorker: {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0,
    18: 12, 19: 12, 20: 12, 21: 12, 22: 12, 23: 12, 24: 12, 25: 12, 26: 12, 27: 12, 28: 12, 29: 12, 30: 12, 31: 12, 32: 12, 33: 12, 34: 12, 35: 12,
    36: 11, 37: 10, 38: 9, 39: 8, 40: 7, 41: 6, 42: 5, 43: 4, 44: 3, 45: 2, 46: 1,
    47: 0, 48: 0, 49: 0, 50: 0, 51: 0, 52: 0, 53: 0, 54: 0, 55: 0, 56: 0, 57: 0, 58: 0, 59: 0, 60: 0, 61: 0, 62: 0, 63: 0, 64: 0, 65: 0
  },
  
  selfEmployed: {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0,
    17: 2, 18: 4, 19: 6, 20: 8,
    21: 10, 22: 10, 23: 10, 24: 10, 25: 10, 26: 10, 27: 10, 28: 10, 29: 10, 30: 10, 31: 10, 32: 10, 33: 10, 34: 10, 35: 10, 36: 10, 37: 10, 38: 10, 39: 10, 40: 10, 41: 10, 42: 10, 43: 10, 44: 10, 45: 10, 46: 10, 47: 10, 48: 10, 49: 10,
    50: 8, 51: 6, 52: 4, 53: 2,
    54: 0, 55: 0, 56: 0, 57: 0, 58: 0, 59: 0, 60: 0, 61: 0, 62: 0, 63: 0, 64: 0, 65: 0
  }
};

/**
 * Work Experience Points 
 */
export const workExperiencePoints = {
  federalSkilledWorker: {
    0: 0,
    1: 9,
    2: 11,
    3: 11,
    4: 13,
    5: 13,
    6: 15,
    7: 15,
    8: 15,
    9: 15,
    10: 15,
    11: 15,
    12: 15,
    13: 15,
    14: 15,
    15: 15 // 15+ years
  },
  
  selfEmployed: {
    0: 0,
    1: 0,
    2: 20,
    3: 25,
    4: 30,
    5: 35,
    6: 35,
    7: 35,
    8: 35,
    9: 35,
    10: 35 // 10+ years
  }
};


// Family status options for the select input
export const familyStatusOptions = [
  { value: '', label: 'Select status' },
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married/Partner' },
  { value: 'children', label: 'With Children' }
];

// Job type options for the select input
export const jobTypeOptions = [
  { value: '', label: 'Select type' },
  { value: 'professional', label: 'Professional' },
  { value: 'skilled', label: 'Skilled Trade' },
  { value: 'unskilled', label: 'Unskilled/Manual' },
  { value: 'business', label: 'Business Owner' },
  { value: 'investor', label: 'Investor' }
];
//TODO need to delete and change later


