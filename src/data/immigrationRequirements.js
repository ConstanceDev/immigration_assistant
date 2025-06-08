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
    CLB10: { reading: [8, 8.5, 9, 9.5, 10], writing: [7.5, 8, 8.5, 9, 9.5, 10], listening: [8.5, 9, 9.5, 10], speaking: [7.5, 8, 8.5, 9, 9.5, 10] },
    CLB9: { reading: 7, writing: 7, listening: 8, speaking: 7 },
    CLB8: { reading: 6.5, writing: 6.5, listening: 7.5, speaking: 6.5 },
    CLB7: { reading: 6, writing: 6, listening: 6, speaking: 6 },
    CLB6: { reading: 5, writing: 5.5, listening: 5.5, speaking: 5.5 },
    CLB5: { reading: 4, writing: 5, listening: 5, speaking: 5 },
    CLB4: { reading: 3.5, writing: 4, listening: 4.5, speaking: 4 }
  },
  
  //Australia Standards
  AUSEng: {
    Superior: { listening: [8, 8.5, 9, 9.5, 10], speaking: [8, 8.5, 9, 9.5, 10], reading: [8, 8.5, 9, 9.5, 10], writing: [8, 8.5, 9, 9.5, 10] },
    Proficient: { listening: [7, 7.5], speaking: [7, 7.5], reading: [7, 7.5], writing: [7, 7.5] },
    Competent: { listening: [6, 6.5], speaking: [6, 6.5], reading: [6, 6.5], writing: [6, 6.5] },
    Vocational: { listening: [5, 5.5], speaking: [5,5.5], reading: [5,5.5], writing: [5,5.5] },
    Functional: { 
      calculation: 'average',
      averageScore: 4.5,
      notes: 'Average band score of at least 4.5 based on the 4 test components'
    } // TODO build a calculation for lanaguage ability
  //TODO only specific points can be taken,set options not input box  https://manaimmigration.com/tools/clb-score-calculator/#Description-of-the-table-fields
  },

  //Common European Framework of Reference for Languages
  CEFR: {
    C2: [9, 8.5],
    C1: [8, 7.5, 7],
    B2: [5, 5.5, 6, 6.5],
    B1: [4, 4.5],
    A2: [3, 3.5],
    A1: [2, 2.5]
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
 * Top Ranking Universities for UK High Potential Individual (HPI) Visa
 * Universities are grouped by graduation date periods
 */
export const topRankingUniversities = {
  // 1 November 2024 to 31 October 2025
  '2024-11-01_2025-10-31': [
    { name: 'California Institute of Technology (Caltech)', country: 'USA' },
    { name: 'Columbia University', country: 'USA' },
    { name: 'Cornell University', country: 'USA' },
    { name: 'Duke University', country: 'USA' },
    { name: 'Ecole Polytechnique Fédérale de Lausanne (EPFL Switzerland)', country: 'Switzerland' },
    { name: 'ETH Zurich (Swiss Federal Institute of Technology)', country: 'Switzerland' },
    { name: 'Fudan University', country: 'China' },
    { name: 'Harvard University', country: 'USA' },
    { name: 'Heidelberg University', country: 'Germany' },
    { name: 'Johns Hopkins University', country: 'USA' },
    { name: 'Karolinska Institute', country: 'Sweden' },
    { name: 'Kyoto University', country: 'Japan' },
    { name: 'Massachusetts Institute of Technology (MIT)', country: 'USA' },
    { name: 'McGill University', country: 'Canada' },
    { name: 'Nanyang Technological University (NTU)', country: 'Singapore' },
    { name: 'National University of Singapore', country: 'Singapore' },
    { name: 'New York University', country: 'USA' },
    { name: 'Northwestern University', country: 'USA' },
    { name: 'Paris Sciences et Lettres - PSL Research University', country: 'France' },
    { name: 'Peking University', country: 'China' },
    { name: 'Princeton University', country: 'USA' },
    { name: 'Shanghai Jiao Tong University', country: 'China' },
    { name: 'Stanford University', country: 'USA' },
    { name: 'Technical University of Munich', country: 'Germany' },
    { name: 'The Chinese University of Hong Kong', country: 'Hong Kong' },
    { name: 'Tsinghua University', country: 'China' },
    { name: 'University of British Columbia', country: 'Canada' },
    { name: 'University of California, Berkeley', country: 'USA' },
    { name: 'University of California, Los Angeles', country: 'USA' },
    { name: 'University of California, San Diego', country: 'USA' },
    { name: 'University of Chicago', country: 'USA' },
    { name: 'University of Hong Kong', country: 'Hong Kong' },
    { name: 'University of Melbourne', country: 'Australia' },
    { name: 'University of Michigan-Ann Arbor', country: 'USA' },
    { name: 'University of Munich (LMU Munich)', country: 'Germany' },
    { name: 'University of Pennsylvania', country: 'USA' },
    { name: 'University of Texas at Austin', country: 'USA' },
    { name: 'University of Tokyo', country: 'Japan' },
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'University of Washington', country: 'USA' },
    { name: 'Yale University', country: 'USA' },
    { name: 'Zhejiang University', country: 'China' }
  ],

  // 1 November 2023 to 31 October 2024
  '2023-11-01_2024-10-31': [
    { name: 'California Institute of Technology (Caltech)', country: 'USA' },
    { name: 'Columbia University', country: 'USA' },
    { name: 'Cornell University', country: 'USA' },
    { name: 'Delft University of Technology', country: 'Netherlands' },
    { name: 'Duke University', country: 'USA' },
    { name: 'Ecole Polytechnique Fédérale de Lausanne (EPFL Switzerland)', country: 'Switzerland' },
    { name: 'ETH Zurich (Swiss Federal Institute of Technology)', country: 'Switzerland' },
    { name: 'Fudan University', country: 'China' },
    { name: 'Harvard University', country: 'USA' },
    { name: 'Johns Hopkins University', country: 'USA' },
    { name: 'Karolinska Institute', country: 'Sweden' },
    { name: 'Kyoto University', country: 'Japan' },
    { name: 'Massachusetts Institute of Technology (MIT)', country: 'USA' },
    { name: 'McGill University', country: 'Canada' },
    { name: 'Nanyang Technological University (NTU)', country: 'Singapore' },
    { name: 'National University of Singapore', country: 'Singapore' },
    { name: 'New York University', country: 'USA' },
    { name: 'Northwestern University', country: 'USA' },
    { name: 'Paris Sciences et Lettres - PSL Research University', country: 'France' },
    { name: 'Peking University', country: 'China' },
    { name: 'Princeton University', country: 'USA' },
    { name: 'Shanghai Jiao Tong University', country: 'China' },
    { name: 'Stanford University', country: 'USA' },
    { name: 'Technical University of Munich', country: 'Germany' },
    { name: 'Tsinghua University', country: 'China' },
    { name: 'University of British Columbia', country: 'Canada' },
    { name: 'University of California, Berkeley', country: 'USA' },
    { name: 'University of California, Los Angeles', country: 'USA' },
    { name: 'University of California, San Diego', country: 'USA' },
    { name: 'University of Chicago', country: 'USA' },
    { name: 'University of Hong Kong', country: 'Hong Kong' },
    { name: 'University of Melbourne', country: 'Australia' },
    { name: 'University of Michigan-Ann Arbor', country: 'USA' },
    { name: 'University of Pennsylvania', country: 'USA' },
    { name: 'University of Tokyo', country: 'Japan' },
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'University of Washington', country: 'USA' },
    { name: 'Yale University', country: 'USA' },
    { name: 'Zhejiang University', country: 'China' }
  ],

  // 1 November 2022 to 31 October 2023
  '2022-11-01_2023-10-31': [
    { name: 'California Institute of Technology (Caltech)', country: 'USA' },
    { name: 'Chinese University of Hong Kong', country: 'Hong Kong' },
    { name: 'Columbia University', country: 'USA' },
    { name: 'Cornell University', country: 'USA' },
    { name: 'Duke University', country: 'USA' },
    { name: 'Ecole Polytechnique Fédérale de Lausanne (EPFL Switzerland)', country: 'Switzerland' },
    { name: 'ETH Zurich (Swiss Federal Institute of Technology)', country: 'Switzerland' },
    { name: 'Harvard University', country: 'USA' },
    { name: 'Johns Hopkins University', country: 'USA' },
    { name: 'Karolinska Institute', country: 'Sweden' },
    { name: 'Kyoto University', country: 'Japan' },
    { name: 'Massachusetts Institute of Technology (MIT)', country: 'USA' },
    { name: 'McGill University', country: 'Canada' },
    { name: 'Nanyang Technological University (NTU)', country: 'Singapore' },
    { name: 'National University of Singapore', country: 'Singapore' },
    { name: 'New York University', country: 'USA' },
    { name: 'Northwestern University', country: 'USA' },
    { name: 'Paris Sciences et Lettres – PSL Research University', country: 'France' },
    { name: 'Peking University', country: 'China' },
    { name: 'Princeton University', country: 'USA' },
    { name: 'Stanford University', country: 'USA' },
    { name: 'Technical University of Munich', country: 'Germany' },
    { name: 'Tsinghua University', country: 'China' },
    { name: 'University of British Columbia', country: 'Canada' },
    { name: 'University of California, Berkeley', country: 'USA' },
    { name: 'University of California, Los Angeles', country: 'USA' },
    { name: 'University of California, San Diego', country: 'USA' },
    { name: 'University of Chicago', country: 'USA' },
    { name: 'University of Hong Kong', country: 'Hong Kong' },
    { name: 'University of Illinois at Urbana-Champaign', country: 'USA' },
    { name: 'University of Melbourne', country: 'Australia' },
    { name: 'University of Michigan-Ann Arbor', country: 'USA' },
    { name: 'University of Pennsylvania', country: 'USA' },
    { name: 'University of Queensland (UQ)', country: 'Australia' },
    { name: 'University of Texas at Austin', country: 'USA' },
    { name: 'University of Tokyo', country: 'Japan' },
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'University of Washington', country: 'USA' },
    { name: 'Yale University', country: 'USA' },
    { name: 'Zhejiang University', country: 'China' }
  ],

  // 1 November 2021 to 31 October 2022
  '2021-11-01_2022-10-31': [
    { name: 'California Institute of Technology (Caltech)', country: 'USA' },
    { name: 'Chinese University of Hong Kong (CUHK)', country: 'Hong Kong' },
    { name: 'Columbia University', country: 'USA' },
    { name: 'Cornell University', country: 'USA' },
    { name: 'Duke University', country: 'USA' },
    { name: 'Ecole Polytechnique Fédérale de Lausanne (EPFL Switzerland)', country: 'Switzerland' },
    { name: 'ETH Zurich (Swiss Federal Institute of Technology)', country: 'Switzerland' },
    { name: 'Harvard University', country: 'USA' },
    { name: 'Johns Hopkins University', country: 'USA' },
    { name: 'Karolinska Institute', country: 'Sweden' },
    { name: 'Kyoto University', country: 'Japan' },
    { name: 'Massachusetts Institute of Technology (MIT)', country: 'USA' },
    { name: 'McGill University', country: 'Canada' },
    { name: 'Nanyang Technological University (NTU)', country: 'Singapore' },
    { name: 'National University of Singapore', country: 'Singapore' },
    { name: 'New York University (NYU)', country: 'USA' },
    { name: 'Northwestern University', country: 'USA' },
    { name: 'Paris Sciences et Lettres – PSL Research University', country: 'France' },
    { name: 'Peking University', country: 'China' },
    { name: 'Princeton University', country: 'USA' },
    { name: 'Stanford University', country: 'USA' },
    { name: 'Tsinghua University', country: 'China' },
    { name: 'University of British Columbia', country: 'Canada' },
    { name: 'University of California, Berkeley', country: 'USA' },
    { name: 'University of California, Los Angeles (UCLA)', country: 'USA' },
    { name: 'University of California, San Diego', country: 'USA' },
    { name: 'University of Chicago US', country: 'USA' },
    { name: 'University of Hong Kong', country: 'Hong Kong' },
    { name: 'University of Melbourne', country: 'Australia' },
    { name: 'University of Michigan-Ann Arbor', country: 'USA' },
    { name: 'University of Munich (LMU Munich)', country: 'Germany' },
    { name: 'University of Pennsylvania', country: 'USA' },
    { name: 'University of Texas at Austin', country: 'USA' },
    { name: 'University of Tokyo', country: 'Japan' },
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'University of Washington', country: 'USA' },
    { name: 'Yale University', country: 'USA' }
  ],

  // 1 November 2020 to 31 October 2021
  '2020-11-01_2021-10-31': [
    { name: 'California Institute of Technology (Caltech)', country: 'USA' },
    { name: 'Columbia University', country: 'USA' },
    { name: 'Cornell University', country: 'USA' },
    { name: 'Duke University', country: 'USA' },
    { name: 'Ecole Polytechnique Fédérale de Lausanne', country: 'Switzerland' },
    { name: 'ETH Zurich (Swiss Federal Institute of Technology)', country: 'Switzerland' },
    { name: 'Harvard University', country: 'USA' },
    { name: 'Johns Hopkins University', country: 'USA' },
    { name: 'Karolinska Institute', country: 'Sweden' },
    { name: 'Kyoto University', country: 'Japan' },
    { name: 'Massachusetts Institute of Technology (MIT)', country: 'USA' },
    { name: 'McGill University', country: 'Canada' },
    { name: 'Nanyang Technological University (NTU)', country: 'Singapore' },
    { name: 'National University of Singapore', country: 'Singapore' },
    { name: 'New York University (NYU)', country: 'USA' },
    { name: 'Northwestern University', country: 'USA' },
    { name: 'Paris Sciences et Lettres – PSL Research University', country: 'France' },
    { name: 'Peking University', country: 'China' },
    { name: 'Princeton University', country: 'USA' },
    { name: 'Stanford University', country: 'USA' },
    { name: 'Technical University of Munich (Technische Universität München)', country: 'Germany' },
    { name: 'Tsinghua University', country: 'China' },
    { name: 'University of British Columbia', country: 'Canada' },
    { name: 'University of California, Berkeley', country: 'USA' },
    { name: 'University of California, Los Angeles (UCLA)', country: 'USA' },
    { name: 'University of California, San Diego', country: 'USA' },
    { name: 'University of Chicago', country: 'USA' },
    { name: 'University of Hong Kong', country: 'Hong Kong' },
    { name: 'University of Illinois at Urbana-Champaign', country: 'USA' },
    { name: 'University of Melbourne', country: 'Australia' },
    { name: 'University of Michigan-Ann Arbor', country: 'USA' },
    { name: 'University of Pennsylvania', country: 'USA' },
    { name: 'University of Texas at Austin', country: 'USA' },
    { name: 'University of Tokyo', country: 'Japan' },
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'University of Washington', country: 'USA' },
    { name: 'University of Wisconsin-Madison', country: 'USA' },
    { name: 'Washington University in St Louis', country: 'USA' },
    { name: 'Yale University', country: 'USA' }
  ],

  // 1 November 2019 to 31 October 2020
  '2019-11-01_2020-10-31': [
    { name: 'Australian National University', country: 'Australia' },
    { name: 'California Institute of Technology (Caltech)', country: 'USA' },
    { name: 'Carnegie Mellon University', country: 'USA' },
    { name: 'Columbia University', country: 'USA' },
    { name: 'Cornell University', country: 'USA' },
    { name: 'Duke University', country: 'USA' },
    { name: 'Ecole Polytechnique Fédérale de Lausanne (EPFL Switzerland)', country: 'Switzerland' },
    { name: 'ETH Zurich (Swiss Federal Institute of Technology)', country: 'Switzerland' },
    { name: 'Harvard University', country: 'USA' },
    { name: 'Heidelberg University', country: 'Germany' },
    { name: 'Hong Kong University of Science and Technology', country: 'Hong Kong' },
    { name: 'Johns Hopkins University', country: 'USA' },
    { name: 'Karolinska Institute', country: 'Sweden' },
    { name: 'Kyoto University', country: 'Japan' },
    { name: 'Massachusetts Institute of Technology (MIT)', country: 'USA' },
    { name: 'McGill University', country: 'Canada' },
    { name: 'Nanyang Technological University (NTU)', country: 'Singapore' },
    { name: 'National University of Singapore', country: 'Singapore' },
    { name: 'New York University', country: 'USA' },
    { name: 'Northwestern University', country: 'USA' },
    { name: 'Peking University', country: 'China' },
    { name: 'Princeton University', country: 'USA' },
    { name: 'Stanford University', country: 'USA' },
    { name: 'Tsinghua University', country: 'China' },
    { name: 'University of British Columbia', country: 'Canada' },
    { name: 'University of California, Berkeley', country: 'USA' },
    { name: 'University of California, Los Angeles (UCLA)', country: 'USA' },
    { name: 'University of California, San Diego (UCSD)', country: 'USA' },
    { name: 'University of Chicago US', country: 'USA' },
    { name: 'University of Hong Kong', country: 'Hong Kong' },
    { name: 'University of Illinois at Urbana-Champaign', country: 'USA' },
    { name: 'University of Melbourne', country: 'Australia' },
    { name: 'University of Michigan-Ann Arbor', country: 'USA' },
    { name: 'University of Pennsylvania', country: 'USA' },
    { name: 'University of Texas at Austin', country: 'USA' },
    { name: 'University of Tokyo', country: 'Japan' },
    { name: 'University of Toronto', country: 'Canada' },
    { name: 'University of Washington', country: 'USA' },
    { name: 'Yale University', country: 'USA' }
  ]
};

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

/**
 * Requirements for Extraordinary Ability Category 
 */

export const extraordinaryAbilityRequirements = {
  international_awards: 'I have received major national or international awards/prizes in my field',
  media_recognition: 'My work has been featured in major publications, media, or trade journals',
  high_salary: 'I earn significantly above average salary in my field (top 10%)',
  professional_membership: 'I am a member of exclusive professional associations requiring outstanding achievements',
  peer_review: 'I have been asked to judge or review others\' work in my field',
  original_contributions: 'I have made original contributions of major significance to my field',
  scholarly_articles: 'I have authored scholarly articles or publications in my field',
  leadership_role: 'I hold or have held a leadership role in distinguished organizations',
  international_recognition: 'I am internationally recognised as a leader/expert in my field',
  advanced_degree: 'I hold an advanced degree (Masters/PhD) or equivalent experience in my field',
}

//TODO this should set as a mutiple choice
export const extraordinaryAbilityOptions = [
  { value: '', label: 'Select status' },
]