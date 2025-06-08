/**
 * Canadian Immigration Programs Data
 * This file contains immigration program information for Canada
 */

import {
    educationPoints,
    agePoints,
    workExperiencePoints,
    languageStandards
} from '../immigrationRequirements.js';



export const canadaPrograms = [

{
    id: 'ca-fswp',
    name: 'Express Entry - Federal Skilled Worker Program (FSWP)',
    country: 'Canada',
    countryCode: 'CA',
    category: 'Skilled Worker',
    isPointsBased: true,
    officialWebsite: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/eligibility/federal-skilled-workers.html',
    requirements: {
        minimumRequirements: {
            workExperience: {
                yearsOfWork: 1,
                isPaidWork: true,
                withinLastYears: 10,
                location:['local', 'abroad'], //TODO need a helper function to check 'local' with country
                nocRequired: true,
                jobTitle: "", //TODO build or connect with NOC database
                //At least 1 year of continuous paid work experience in the last 10 years, matched with NOC
            },
            language: {
                english: languageStandards.CLB.CLB7, // minimum CLB7
            },

            eduction: {
                level: [
                    'oneYearTwelve', 
                    'oneYearThirteen', 
                    'twoYearDiploma', 
                    'bachelorsThreeYear', 
                    'threeDiploma',
                    'twoCertificates',
                    'twoBachelors',
                    'professionalDegree',
                    'masters',
                    'doctorate'
                ], 
                description: 'Any above secondary education.'
            }
        },
        selectionFactors: {
            minPointsRequired: 41,
            language: {
                english: {
                    'CLB10': 24,
                    'CLB9': 24,
                    'CLB8': 20,
                    'CLB7': 16,
                    'CLB6': 0,
                    'CLB5': 0,
                    'CLB4': 0,
                },

                education: educationPoints.federalSkilledWorker,
                workExperience: workExperiencePoints.federalSkilledWorker,
                age: agePoints.federalSkilledWorker,
            }
        }
    }
},

{
    id: 'ca-cec',
    name: 'Express Entry - Canadian Experience Class (CEC)',
    country: 'Canada',
    countryCode: 'CA',
    category: 'Skilled Worker',
    isPointsBased: false, //TODO in the further phase, build Comprehensive Ranking System (CRS)
    officialWebsite: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/canadian-experience-class.html',

    requirements: {
            workExperience: {
                yearsOfWork: 1,
                isPaidWork: true,
                withinLastYears: 3,
                location:['local'],
                nocRequired: true,
                jobTitle: "", //TODO build or connect with NOC database
                //eligibleNOC: ['0', 'A', 'B'],
                //'Job must be in skill type 0, A, or B of National Occupational Classification (NOC), at least 1 year of full time work experience in Canada within 3 years of applying, be paid work',
            },

            language: {
                // NOC_0_jobs: 'CLB7', 
                // NOC_A_jobs: 'CLB7', 
                // NOC_B_jobs: 'CLB5',  
                //For NOC 0 or A jobs: minimum CLB 7 in all abilities. For NOC B jobs: minimum CLB 5 in all abilities
                //TODO need a check function?
            },

            education: {
                level: null, 
                //There is no education requirement for the Canadian Experience Class
            }
    }
},

{
    id: 'ca-fstp',
    name: 'Express Entry - Federal Skilled Trades Program (FSTP)',
    country: 'Canada',
    countryCode: 'CA',
    category: 'Skilled Worker',
    isPointsBased: false, //TODO in the further phase, build Comprehensive Ranking System (CRS)
    officialWebsite: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/who-can-apply/federal-skilled-trades.html',

    requirements: {
            workExperience: {
                yearsOfWork: 2,
                isPaidWork: true,
                withinLastYears: 5,
                nocRequired: true,
                jobTitle: "", //TODO build or connect with NOC database
                eligibleNOC: {
                    //TODO
                    // majorGroups: [
                    //     '72 (excluding Sub-Major Group 726)',
                    //     '73', '82', '83', '92',
                    //     '93 (excluding Sub-Major Group 932)'
                    // ],
                    // minorGroups: ['6320'],
                    // unitGroups: ['62200']
                    },
                //Work experience must be in the same NOC and be in eligible NOC groups
            },
            language: {
                english:'',
                //TODO need to rewrite it
            },
            education: {
                level: null,
                //'There is no education requirement for the Federal Skilled Trades Program'
            }
    }
}, 

{
    id: 'ca-suv',
    name: 'Start-up Visa Program (SUV)',
    country: 'Canada',
    countryCode: 'CA',
    category: 'Entrepreneur',
    isPointsBased: false, //TODO in the further phase, build Comprehensive Ranking System (CRS)
    officialWebsite: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html',

    requirements: {
            businessQualification: {
                ownershipPercentage: 50,
                //Each applicant must hold 10% or more of the total voting rights, applicants and the designated organization together must hold more than 50% of the total voting rights
            },
            language: {
                english: languageStandards.CLB.CLB5, //Minimum CLB 5 in all abilities
            },
            fundBudget: {
                miniFund: 14690, //One person at least $14,690
                currency: 'CAD',
                //TODO: needs to have currency converter
            }
    }
},

{
    id: 'ca-sep',
    name: 'Self-Employed Persons Program',
    country: 'Canada',
    countryCode: 'CA',
    category: 'Skilled Worker',
    isPointsBased: true, //TODO in the further phase, build Comprehensive Ranking System (CRS)
    officialWebsite: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/self-employed.html',

    requirements: {
        minimumRequirements: {
            workExperience: {
                jobTitle: [
                'taken part in cultural activities or athletics at a world-class level',
                'been a self-employed person in cultural activities or athletics'
        ], //TODO needs to list a bundle of job titles to match OR have match with NOC
                yearsOfWork: 2,
                withinLastYears: 5,
            }
        },

        selectionFactors: {
            minPointsRequired: 35,

            education: educationPoints.selfEmployed,
            workExperience: workExperiencePoints.selfEmployed,
            age: agePoints.selfEmployed,

            language: {
                english: languageStandards.CLB.CLB7, //minimum CLB 7 in all abilities
            }
        }
    }
},

{
    id: 'ca-pgwp',
    name: 'Post-Graduation Work Permit (PGWP)',
    country: 'Canada',
    countryCode: 'CA',
    category: 'Graduate/Student',
    officialWebsite: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html',
}
];


export default canadaPrograms;