/**
 * United Kingdom (UK) Immigration Programs Data
 * This file contains immigration program information for United States
 */

import {
    languageStandards,
    topRankingUniversities
    } from '../immigrationRequirements.js';

export const ukPrograms = [
{
    id: 'uk-swv',
    name: 'Skilled Worker Visa',
    country: 'United Kingdom',
    countryCode: 'UK',
    category: 'Skilled Worker',
    isPointsBased: false,
    officialWebsite: 'https://www.gov.uk/skilled-worker-visa',
    requirements: {
        language: {
            english: languageStandards.CEFR.B1, //at least CEFR B1
        },
        workExperience: {
            jobTitle: '', //TODO need to match with occupation code
            salary: 38700, //minimum: £38,700 per year
            currency: "GBP"
        },
    }
},

{
    id: 'uk-gtv',
    name: 'Global Talent Visa',
    country: 'United Kingdom',
    countryCode: 'UK',
    category: 'Extraordinary Ability',
    isPointsBased: false,
    officialWebsite: 'https://www.gov.uk/global-talent',
    requirements: {
        extraordinaryAbility: {
            requiredOptions: [
                'international_awards',
                'media_recognition', 
                'peer_review',
                'original_contributions',
                'scholarly_articles',
                'leadership_role',
                'international_recognition'
            ],
            minimumRequired: 4, // Need 4+ of these 7 options
        },
    }
},

{
    id: 'uk-ifv',
    name: 'Innovator Founder Visa',
    country: 'United Kingdom',
    countryCode: 'UK',
    category: 'Entrepreneur',
    officialWebsite: 'https://www.gov.uk/innovator-founder-visa',
    isPointsBased: false,
    requirements: {
        language: {
            english: languageStandards.CEFR.B2, //at least CEFR B2 level
        },
        fundBudget: {
            fund: 50000, //At least £50,000 
            currency: "GBP"
        }
    }
},

{
    id: 'uk-hpi',
    name: 'High Potential Individual Visa',
    country: 'United Kingdom',
    countryCode: 'UK',
    category: 'Graduate/Student',
    isPointsBased: false,
    officialWebsite: 'https://www.gov.uk/high-potential-individual-visa',
    requirements: {
        education: {
            withinLastYears: 5, //Graduated from an eligible international university within the last 5 years
            level: [
                'bachelorsThreeYear', 
                'twoBachelors',
                'professionalDegree', 
                'masters', 
                'doctorate' 
            ],
            university: topRankingUniversities, //TODO match with top ranking university tables given graduation dates
        },
        language: {
            level: languageStandards.CEFR.B1 //at CEFR B1 level
        }
    }
},

{
    id: 'uk-gv',
    name: 'Graduate Visa',
    country: 'United Kingdom',
    countryCode: 'UK',
    category: 'Graduate/Student',
    isPointsBased: false,
    officialWebsite: 'https://www.gov.uk/graduate-visa',
},
];

export default ukPrograms;