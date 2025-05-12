import { educationRank } from '../data/immigrationPrograms';

/**
 * Calculate eligibility based on form data
 * @param {object} formData - User profile data
 * @param {array} programs - List of immigration programs
 * @return {array} - Filtered list of eligible programs
 */
export const calculateEligibility = (formData, programs) => {
  let eligiblePrograms = [];

  programs.forEach(program => {
    // Check if program and requirements exist
    if (!program || !program.requirements) {
      console.warn('Invalid program data:', program);
      return; // Skip this program
    }
    
    const req = program.requirements;
    let eligible = true;
    let points = 0;
    let notes = [];
    
    // Determine if this is a points-based program
    const isPointsBasedProgram = program.minPoints > 0;

    // Age check - add null check for ageRange
    if (req.ageRange && (parseInt(formData.age) < req.ageRange[0] || parseInt(formData.age) > req.ageRange[1])) {
      eligible = false;
      notes.push(`Age must be between ${req.ageRange[0]} and ${req.ageRange[1]}`);
    } else if (req.ageRange && isPointsBasedProgram) {
      // Calculate age points for points-based programs
      if (program.name.includes('Express Entry')) {
        const age = parseInt(formData.age);
        if (age >= 18 && age <= 35) points += 12;
        else if (age === 36) points += 11;
        else if (age === 37) points += 10;
        else if (age === 38) points += 9;
        else if (age === 39) points += 8;
        else if (age === 40) points += 7;
        else if (age === 41) points += 6;
        else if (age === 42) points += 5;
        else if (age === 43) points += 4;
        else if (age === 44) points += 3;
        else if (age === 45) points += 2;
        else if (age > 45) points += 0;
      } else if (program.name.includes('Skilled Worker')) {
        // UK Skilled Worker points for age could be calculated here
        // This is a simplified example
        const age = parseInt(formData.age);
        if (age >= 18 && age <= 30) points += 20;
        else if (age > 30 && age <= 40) points += 10;
        else points += 5;
      }
    }

    // Education check
    if (req.minEducation && educationRank[formData.education] < educationRank[req.minEducation]) {
      eligible = false;
      notes.push(`Minimum education required: ${req.minEducation}`);
    } else if (isPointsBasedProgram) {
      // Points for education (points-based programs)
      if (program.name.includes('Express Entry')) {
        if (formData.education === 'doctorate') points += 25;
        else if (formData.education === 'masters') points += 23;
        else if (formData.education === 'bachelors') points += 21;
        else if (formData.education === 'diploma') points += 19;
        else points += 5;
      } else if (program.name.includes('Skilled Worker')) {
        // UK Skilled Worker points for education
        if (formData.education === 'doctorate') points += 20;
        else if (formData.education === 'masters') points += 15;
        else if (formData.education === 'bachelors') points += 10;
      }
    }

    // Work experience check
    if (req.minWorkExperience && parseInt(formData.workExperience) < req.minWorkExperience) {
      eligible = false;
      notes.push(`Minimum ${req.minWorkExperience} years of work experience required`);
    } else if (isPointsBasedProgram && formData.workExperience) {
      // Points for work experience (points-based programs)
      const exp = parseInt(formData.workExperience);
      if (program.name.includes('Express Entry')) {
        if (exp >= 6) points += 15;
        else if (exp >= 4) points += 13;
        else if (exp >= 2) points += 11;
        else if (exp >= 1) points += 9;
      } else if (program.name.includes('Skilled Worker')) {
        // UK Skilled Worker points for experience
        if (exp >= 5) points += 20;
        else if (exp >= 3) points += 15;
        else if (exp >= 1) points += 10;
      }
    }

    // Language check
    if (req.minLanguage) {
      if (req.minLanguage.english && !formData.language.english) {
        eligible = false;
        notes.push(`English language proficiency required`);
      }
      if (req.minLanguage.french && !formData.language.french) {
        eligible = false;
        notes.push(`French language proficiency required`);
      }
      
      // Points for language (points-based programs)
      if (isPointsBasedProgram) {
        if (program.name.includes('Express Entry')) {
          if (formData.language.english) points += 20;
          if (formData.language.french) points += 4;
        } else if (program.name.includes('Skilled Worker')) {
          // UK Skilled Worker points for language
          if (formData.language.english) {
            if (formData.language.englishScore === 'C1') points += 20;
            else if (formData.language.englishScore === 'B1') points += 10;
          }
        }
      }
    }

    // Salary check
    if (req.minSalary && parseInt(formData.annualIncome) < req.minSalary) {
      eligible = false;
      notes.push(`Minimum annual income of £${req.minSalary} required`);
    }

    // Net worth check
    if (req.minNetWorth && parseInt(formData.netWorth) < req.minNetWorth) {
      eligible = false;
      notes.push(`Minimum net worth of £${req.minNetWorth} required`);
    }

    // Add points for income (points-based programs)
    if (isPointsBasedProgram && formData.annualIncome) {
      const income = parseInt(formData.annualIncome);
      if (program.name.includes('Express Entry')) {
        if (income > 100000) points += 10;
        else if (income > 75000) points += 8;
        else if (income > 50000) points += 6;
        else if (income > 30000) points += 4;
      } else if (program.name.includes('Skilled Worker')) {
        // UK Skilled Worker points for salary
        if (income > 40000) points += 20;
        else if (income > 30000) points += 10;
        else if (income > 25600) points += 0;
      }
    }

    // If program has minimum points and we're below it, mark as ineligible
    if (isPointsBasedProgram && points < program.minPoints) {
      eligible = false;
      notes.push(`Minimum ${program.minPoints} points required, you have ${points}`);
    }

    if (eligible) {
      eligiblePrograms.push({
        ...program,
        isPointsBased: isPointsBasedProgram,
        points: isPointsBasedProgram ? points : 0,
        notes: notes.length > 0 ? notes : null
      });
    }
  });

  // Sort by country and then by points (if applicable)
  eligiblePrograms.sort((a, b) => {
    if (a.country === b.country) {
      return b.points - a.points;
    }
    return a.country.localeCompare(b.country);
  });

  return eligiblePrograms;
};