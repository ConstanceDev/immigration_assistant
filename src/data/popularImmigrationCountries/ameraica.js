/**
 * USA Immigration Programs Data
 * This file contains immigration program information for United States
 */

export const usaPrograms = [
{
    id: 'us-eb1a',
    name: 'EB-1A: Extraordinary Ability',
    country: 'USA',
    countryCode: 'US',
    category: 'Extraordinary Ability',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1',
    requirements: {
        extraordinaryAbility: {
            requiredOptions: [
                'international_awards',
                'media_recognition', 
                'professional_membership',
                'peer_review',
                'original_contributions',
                'scholarly_articles',
                'leadership_role',
                'high_salary'
            ],
            minimumRequired: 3, //Need 3+ of these 8 options
        }
    }
},

{
    id: 'us-eb1b',
    name: 'EB-1B: Outstanding Professors and Researchers',
    country: 'USA',
    countryCode: 'US',
    category: 'Extraordinary Ability',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1',
    requirements: {
        workExperience: {
            yearsOfWork: 3,
        },
        extraordinaryAbility: {
            requiredOptions: [
                'international_awards',
                'media_recognition',
                'peer_review',
                'original_contributions',
                'scholarly_articles',
                'advanced_degree'
            ],
            minimumRequired: 2, //Need 2+ of these 6 options
        }
    }
},

{
    id: 'us-eb2b',
    name: 'EB-2B: Exceptional Ability',
    country: 'USA',
    countryCode: 'US',
    category: 'Extraordinary Ability',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2',
    requirements: {
        extraordinaryAbility: {
            requiredOptions: [
                'advanced_degree',
                'professional_membership',
                'media_recognition',
                'high_salary',
                'scholarly_articles',
                'original_contributions'
            ],
            minimumRequired: 3, //Need 3+ of these 6 options
        }
    }
},

{
    id: 'us-eb1c',
    name: 'EB-1C: Multinational Managers or Executives',
    country: 'USA',
    countryCode: 'US',
    category: 'High Professional',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-first-preference-eb-1',
    requirements: {
        workExperience: {
            yearsOfWork: 1,
            withinLastYears: 3,
            location: ['abroad'],
            jobTitle: ['Executive', 'Manager'], //TODO build to match with database
        }
    }
},

{
    id: 'us-eb2a',
    name: 'EB-2A: Advanced Degree Professionals',
    country: 'USA',
    countryCode: 'US',
    category: 'High Professional',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2',
    requirements: {
        options: {
            //Must meet either option 1 OR option 2
            option1: {
                education: {
                    level: ['masters', 'doctorate', 'professionalDegree'], //Master\'s degree or higher
                }
            },
            option2: {
                education: {
                    level: ['bachelorsThreeYear', 'twoBachelors'],
                },
                workExperience: {
                    yearsOfWork: 5, //At least 5 years working experience if only has Bachelor degree
                }
            }
        }
    }
},

{
    id: 'us-eb2-niw',
    name: 'EB-2 NIW: National Interest Waiver',
    country: 'USA',
    countryCode: 'US',
    category: 'High Professional',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-second-preference-eb-2',
    requirements: {
        // Must be determined as EB-2A: Advanced Degree Professionals or EB-2B: Exceptional Ability
    }
},

{
    id: 'us-eb3-skilledWorkers',
    name: 'EB-3 Visa Skilled Workers',
    country: 'USA',
    countryCode: 'US',
    category: 'Skilled Worker',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-third-preference-eb-3',
    requirements: {
        workExperience: {
            yearsOfWork: 2, //At least 2 years of job experience or training
        }
    }
},
{
    id: 'us-eb3-professionals',
    name: 'EB-3 Visa Professionals',
    country: 'USA',
    countryCode: 'US',
    category: 'Skilled Worker',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-third-preference-eb-3',
    requirements: {
        education: {
            level: [
                'bachelorsThreeYear', 
                'twoBachelors', 
                'masters', 
                'doctorate', 
                'professionalDegree'
            ]
        }
    }
},
{
    id: 'us-eb3-otherWorkers',
    name: 'EB-3 Visa Other Workers',
    country: 'USA',
    countryCode: 'US',
    category: 'Skilled Worker',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/employment-based-immigration-third-preference-eb-3',
    requirements: {
        workExperience: {
        yearsOfWork: 0,
        maxYearsOfWork: 2, //Less than 2 years of experience/training'
        }
    }
},

{
    id: 'us-eb5',
    name: 'EB-5 Immigrant Investor Program',
    country: 'USA',
    countryCode: 'US',
    category: 'Investment',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers/eb-5-immigrant-investor-program',
    requirements: {
        investmentBudget: {
            minAmount: 800000,
            currency: 'USD',
        }
    }
},

{
    id: 'us-h1b',
    name: 'H-1B Visa',
    country: 'USA',
    countryCode: 'US',
    category: 'Skilled Worker',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/h-1b-specialty-occupations',
    requirements: {
        education: {
            level: [
                'bachelorsThreeYear', 
                'twoBachelors', 
                'masters', 
                'doctorate', 
                'professionalDegree'
            ] //Bachelor\'s degree or higher in the specific specialty (or equivalent)
        }
    }
},

{
    id: 'us-l1a',
    name: 'L-1A: Intracompany Transferee Executive or Manager',
    country: 'USA',
    countryCode: 'US',
    category: 'High Professional',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1a-intracompany-transferee-executive-or-manager',
    requirements: {
        workExperience: {
            yearsOfWork: 1,
            withinLastYears: 3,
            location: ['abroad'],
            jobTitle: ['Executive', 'Manager'], //TODO build to match with database
        }
    }
},

{
    id: 'us-l1b',
    name: 'L-1B: Intracompany Transferee Specialized Knowledge',
    country: 'USA',
    countryCode: 'US',
    category: 'High Professional',
    isPointsBased: false,
    officialWebsite: 'https://www.uscis.gov/working-in-the-united-states/temporary-workers/l-1b-intracompany-transferee-specialized-knowledge',
    requirements: {
        workExperience: {
            yearsOfWork: 1,
            withinLastYears: 3,
            location: ['abroad'],
        }
    }
}
];

export default usaPrograms;