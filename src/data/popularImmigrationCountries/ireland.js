/**
 * Ireland Immigration Programs Data
 * This file contains immigration program information for Ireland
 */

export const irelandPrograms = [
{
    id: 'irl-csep',
    name: 'Critical Skills Employment Permit (CSEP)',
    country: 'Ireland',
    countryCode: 'IRL',
    category: 'Skilled Worker',
    isPointsBased: false,
    officialWebsite: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/critical-skills-employment-permit/',
    requirements: {
        options: {
            option1: {
                workExperience: {
                    jobTitle: '', //TODO build database for Critical Skills Occupations List
                    salary: {
                        min: 32000,
                        max: 64000, //salary must ≥ €32,000 < €64,000
                        currency: 'EUR'
                    }
                }
            },
            option2: {
                workExperience: {
                    salary: {
                        min: 64000, // ≥ €64,000
                        currency: 'EUR'
                    }
                }
            }
        }
    }
},

{
    id: 'irl-gep',
    name: 'General Employment Permit',
    country: 'Ireland',
    countryCode: 'IRL',
    category: 'Skilled Worker',
    isPointsBased: false,
    officialWebsite: 'https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/general-employment-permit/',
    requirements: {
        workExperience: {
            jobTitleExlucde: '', //Job must NOT on Ineligible Categories of Employment List
            //TODO build database, exclude these jobs
            salary: {
                min: 30000,
                currency: 'EUR'
            }
        }
    }
},

{
    id: 'irl-iip',
    name: 'Investor Programme (IIP)',
    country: 'Ireland',
    countryCode: 'IRL',
    category: 'Investment',
    isPointsBased: false,
    officialWebsite: 'https://www.irishimmigration.ie/coming-to-live-in-ireland/i-want-to-invest-in-ireland/',
    requirements: {
        investmentBudget: {
            minAmount: 500000,
            currency: 'EUR'
        },
        netWorth: {
            minNetWorth: 2000000,
            currency: 'EUR'
        }
    }
},

{
    id: 'irl-step',
    name: 'Start-up Entrepreneur Programme (STEP)',
    country: 'Ireland',
    countryCode: 'IRL',
    category: 'Entrepreneur',
    isPointsBased: false,
    officialWebsite: 'https://www.irishimmigration.ie/coming-to-work-in-ireland/what-are-my-options-for-working-in-ireland/coming-to-work-for-more-than-90-days/start-up-entrepreneur-programme-step/',
    requirements: {
        fundBudget: {
            miniFund: 50000,
            currency: 'EUR'
        }
    } 
},

{
    id: 'irl-1g',
    name: 'Stamp 1G (Graduate)',
    country: 'Ireland',
    countryCode: 'IRL',
    category: 'Graduate/Student',
    isPointsBased: false,
    officialWebsite: 'https://www.irishimmigration.ie/coming-to-work-in-ireland/what-are-my-options-for-working-in-ireland/coming-to-work-for-more-than-90-days/start-up-entrepreneur-programme-step/',
}
];

export default irelandPrograms;