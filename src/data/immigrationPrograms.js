/**
 * Immigration visa/policy Database
 * Contains detailed information about immigration programs for different countries
 */

/**
 * TO-Do:
 * Chinese version
 * double check links
 * currency converter $-£
 */

export const immigrationPrograms = [
    {
    category: 'US and Canada',
    programs: [
    {
        country: 'Canada',
        name: 'Express Entry(EE) - Federal Skilled Worker',
        minPoints: 67,
        requirement: {
            ageRange: [18, 45],
            minEducation: 'Bachelor',
            minYearOfWorkExperience: 1,
            minLanguage: {english: 'CLB 7', French: 'NCLC 7'},
            notes: 'Points-based system, higher points increase chances',
        },
        link:'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html'
    },

    {
        country: 'Canada',
        name: 'Provincial Nominee Program (PNP)',
        minPoints: 'N/A',
        requirement: {
            ageRange: [21, 55],
            minEducation: 'Diploma',
            minYearOfWorkExperience: 1,
            minLanguage: {english: 'CLB 7', French: 'NCLC 7'},
            notes: 'Requirements vary by province'
        },
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html'
    },

    {
        country: 'Canada',
        name: 'Start-up Visa Program',
        minPoints: 'N/A',
        requirement: {
            ageRange: [18, 65],
            minEducation: 'Secondary',
            minYearOfWorkExperience: 'N/A',
            minNetWorth: 75000,
            minLanguage: { english: 'CLB 5', french: 'NCLC 5' },
            notes: 'Requires support from a designated organisation'
        },
        link: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html',
    },

    ],
},

{
    category: 'UK',
    programs: [
    {
        country: 'UK',
        name: 'Skilled Worker Visa',
        minPoints: 'N/A',
        requirement: {
            ageRange: [18, 65],
            minEducation: 'Bachelor',
            minYearOfWorkExperience: 'N/A',
            minLanguage: {english: 'B1' },
            minSalary: 26200,
            notes: 'Requires job sponsorship from UK employer',
        },
        link: 'https://www.gov.uk/skilled-worker-visa',
    },

    {
        country: 'UK',
        name: 'Global Talent Visa (GTV)',
        minPoints: 'N/A',
        requirement: {
            ageRange: [18, 65],
            minEducation: 'Master',
            graduationRecency: 5,
            minYearOfWorkExperience: 'N/A',
            minLanguage: { english: 'B1' },
            notes: 'Must have graduated from top-ranking university within last 5 years, the list of top universities changes every year.',
        },
        link: 'https://www.gov.uk/high-potential-individual-visa',
    },

    {
        country: 'UK',
        name: 'Innovator Founder Visa',
        minPoints: 'N/A',
        requirement: {
            ageRange: [18, 65],
            minEducation: 'N/A',
            minNetWorth: 50000,
            minYearOfWorkExperience: 'N/A',
            minLanguage: {english: 'B2' },
            notes: 'For experienced businesspeople with an innovative, viable and scalable business idea',
        },
        link: 'https://www.gov.uk/innovator-founder-visa',
    },
    ],

    
},

];



/**
 * Education levels ranked by value
 * Used for comparing user education with program requirements
 */

export const educationRank = {
    'Secondary': 1,
    'Diploma': 2,
    'Bachelors': 3,
    'Masters': 4,
    'Doctorate': 5
};

// Education options for the select input
export const educationOptions = [
  { value: '', label: 'Select level' },
  { value: 'secondary', label: 'Secondary School' },
  { value: 'diploma', label: 'Diploma/Certificate' },
  { value: 'bachelors', label: 'Bachelor Degree' },
  { value: 'masters', label: 'Master Degree' },
  { value: 'doctorate', label: 'Doctorate/PhD' }
];

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

// Language score options
export const languageScoreOptions = [
  { value: '', label: 'Select level' },
  { value: 'A1', label: 'Basic (A1/A2)' },
  { value: 'B1', label: 'Intermediate (B1/B2)' },
  { value: 'C1', label: 'Advanced (C1/C2)' }
];
