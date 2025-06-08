import {
  languageStandards,
  educationPoints,
  agePoints,
  workExperiencePoints,
  topRankingUniversities
} from '../data/immigrationRequirements';

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
    if (numScore >= 8) return 10;
    if (numScore >= 7) return 9;
    if (numScore >= 6.5) return 8;
    if (numScore >= 6) return 7;
    if (numScore >= 5) return 10;
    if (numScore >= 8) return 10;
  }
}
}