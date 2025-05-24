/**
 * Canadian Immigration Programs Data
 * This file contains immigration program information for Canada
 */



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
                location:['Canada', 'China', 'America', 'Australia', 'UK', 'Ireland', 'New Zealand'], //TODO need to complete all countries
                nocRequired: true,
                jobTitle: "NOC", //TODO build or connect with NOC database
                description: "At least 1 year of continuous paid work experience in the last 10 years, matched with NOC",
            },
            language: {
                english: '', //CLB7, IELTS 6 in all abilities
            },

            eduction: {
                level: '', //TODO need a table for education level
                description: 'Any diploma, degree, or trade or apprenticeship credential issued for completing a program of study or training at a recognised educational or training institution'
            }
        },
        selectionFactors: {
            minPointsRequired: 41,
            language: {
                firstOfficial: {
                    Functional: 'not_eligible',
                    Vocational: 'not_eligible',
                    Proficient: 16, //CLB9_plus: { speaking: 6, listening: 6, reading: 6, writing: 6 }
                    Competent: 20, //CLB8: { speaking: 5, listening: 5, reading: 5, writing: 5 }
                    Superior: 24, //CLB7: { speaking: 4, listening: 4, reading: 4, writing: 4 }
                },

                education: {
                    doctorate: 25,
                    professional_degree: 23,
                    masters: 23,
                    two_or_more_credentials: 22,
                    bachelors_3plus_years: 21,
                    two_year_degree: 19,
                    one_year_degree: 15,
                    secondary_school: 5
                },

                workExperience: {
                    '1' : 9,
                    '2-3': 11,
                    '4-5': 13,
                    '6__or_more': 15
                },

                age: {
                    'under_18': 0,
                    '18-35': 12,
                    '36': 11,
                    '37': 10,
                    '38': 9,
                    '39': 8,
                    '40': 7,
                    '41': 6,
                    '42': 5,
                    '43': 4,
                    '44': 3,
                    '45': 2,
                    '46': 1,
                    '47_and_older': 0
                },  
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
        minimumRequirements: {
            workExperience: {
                yearsOfWork: 1,
                isPaidWork: true,
                withinLastYears: 3,
                location:['Canada'],
                nocRequired: true,
                jobTitle: "NOC", //TODO build or connect with NOC database
                eligibleNOC: ['0', 'A', 'B'],
                description: 'Job must be in skill type 0, A, or B of National Occupational Classification (NOC), at least 1 year of full time work experience in Canada within 3 years of applying, be paid work',
            },

            language: {
                NOC_0_A_jobs: 'CLB7', // All 4 abilities for NOC 0 or A
                NOC_B_jobs: 'CLB5',   // All 4 abilities for NOC B
                //'For NOC 0 or A jobs: minimum CLB 7 in all abilities. For NOC B jobs: minimum CLB 5 in all abilities'
                //TODO need to fix this with a if statement?
            },

            education: {
                level: '', //TODO all education level is fine
                //'There is no education requirement for the Canadian Experience Class'
            }
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
        minimumRequirements: {
            workExperience: {
                yearsOfWork: 2,
                isPaidWork: true,
                withinLastYears: 5,
                nocRequired: true,
                jobTitle: "NOC", //TODO build or connect with NOC database
                //TODO eligibleNOC: {
                //     majorGroups: [
                //         '72 (excluding Sub-Major Group 726)',
                //         '73', '82', '83', '92',
                //         '93 (excluding Sub-Major Group 932)'
                //     ],
                //     minorGroups: ['6320'],
                //     unitGroups: ['62200']
                //     },
                description: 'Work experience must be in the same NOC and be in eligible NOC groups, at least 2 year of full-time work experience within 5 years before apply, be paid work',
            },

            language: {
                english:'',
                //TODO need to rewrite it
            },

            education: {
                level: '',
                //'There is no education requirement for the Federal Skilled Trades Program'
            }
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
        minimumRequirements: {
            businessQualification: {
                ownershipPercentage: 50,
                description: 'Each applicant must hold 10% or more of the total voting rights, applicants and the designated organization together must hold more than 50% of the total voting rights',
            },

            language: {
                english:'', //Minimum CLB 5 in all abilities
            },

            fundBudget: {
                fee: 14690, //One person at least $14,690
                //TODO: needs to have currency converter
            }
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

            education: {
                masters_phd_17years: 25,
                two_bachelors_15years: 22,
                three_year_diploma_15years: 22,
                bachelors_14years: 20,
                two_year_diploma_14years: 20,
                one_year_bachelors_13years: 15,
                one_year_diploma_13years: 15,
                one_year_diploma_12years: 12,
                secondary_school: 5
            },

            workExperience: {
                2: 20,
                3: 25,
                4: 30,
                5: 35
            },

            age: {
            '16_or_under': 0,
            17: 2, 18: 4, 19: 6, 20: 8,
            '21-49': 10,
            50: 8, 51: 6, 52: 4, 53: 2,
            '54_plus': 0    
            },

            language: {
                english: '',
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