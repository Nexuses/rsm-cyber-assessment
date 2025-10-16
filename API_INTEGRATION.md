# API Integration Documentation

## Overview
The cybersecurity assessment tool has been updated to integrate with the Power Platform API for fetching questions and submitting assessment data.

## API Endpoint
```
https://5bfe6b98616c4954acb4cb09b2abb6.70.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/05c19af3d01f4163a1bb54363eac16cf/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=k682c2LU7i01Y-jgFlSw65rS2rM2SiaJpl94WGd1aeI
```

## Key Changes Made

### 1. API Service (`lib/api.ts`)
- Created comprehensive API service with TypeScript interfaces
- Implemented `fetchAssessmentQuestions()` function (currently returns mock data)
- Implemented `submitAssessment()` function for sending complete assessment data
- Added `calculateScores()` utility function for scoring calculations
- Defined all necessary TypeScript interfaces matching the API structure

### 2. Assessment Questions Component (`components/assessment-questions.tsx`)
- Updated to fetch questions from API instead of using hardcoded data
- Added loading state with spinner
- Updated data structure to match API format
- Enhanced answer structure to include question text, category, and score

### 3. Main Application (`app/page.tsx`)
- Updated to use new API types and functions
- Modified assessment completion to calculate scores and submit to API
- Integrated API submission with error handling

### 4. Report Summary (`components/report-summary.tsx`)
- Updated to use new data structure with calculated scores
- Modified personal information display to match new field names
- Updated scoring calculations to use pre-calculated scores

### 5. Personal Info Form (`components/personal-info-form.tsx`)
- Updated to use new API types
- Removed individual API submission (now handled at assessment completion)

## Data Structure

### Assessment Data Format
```typescript
{
  "personalInfo": {
    "firstName": "John",
    "lastName": "Smith", 
    "email": "john.smith@company.com",
    "companyName": "ABC Corporation",
    "jobTitle": "IT Security Manager",
    "assessmentDate": "2024-01-15"
  },
  "assessmentAnswers": [
    {
      "questionId": "cg-rm-1",
      "question": "Question text...",
      "answer": "yes",
      "comment": "Additional details...",
      "category": "Cyber Governance",
      "score": 5
    }
  ],
  "scoring": {
    "categoryScores": {
      "CG": {
        "name": "Cyber Governance",
        "total": 35,
        "max": 55,
        "questions": 11,
        "percentage": 63.6
      }
    },
    "overallScore": {
      "totalScore": 212.5,
      "maxPossibleScore": 285,
      "overallPercentage": 74.6,
      "maturityLevel": "Intermediate"
    }
  },
  "metadata": {
    "assessmentVersion": "NIST CSF 2.0",
    "generatedAt": "2024-01-15T10:30:00.000Z",
    "totalQuestions": 57,
    "answeredQuestions": 57,
    "completionPercentage": 100.0
  }
}
```

## Features

### Question Loading
- Questions are fetched from the API when the assessment starts
- Loading state is displayed while questions are being fetched
- Error handling for failed API calls

### Assessment Submission
- Complete assessment data is submitted to the API upon completion
- Includes personal information, all answers, calculated scores, and metadata
- Error handling and logging for submission failures

### Scoring System
- Automatic score calculation based on answers (Yes=5, Partial=2.5, No=0)
- Category-wise scoring for all NIST CSF 2.0 categories
- Overall maturity level calculation (Initial, Basic, Intermediate, Advanced)

## Usage

1. **Start Assessment**: User fills personal information form
2. **Answer Questions**: Questions are loaded from API and presented one by one
3. **Complete Assessment**: All answers are collected and scores are calculated
4. **Submit to API**: Complete assessment data is sent to the Power Platform API
5. **View Results**: Report summary displays calculated scores and maturity level

## Error Handling

- API failures are logged to console
- User experience continues even if API calls fail
- Loading states provide feedback during API operations
- Graceful fallbacks for missing data

## Future Enhancements

- Real API integration for question fetching (currently using mock data)
- Enhanced error messaging for users
- Retry mechanisms for failed API calls
- Progress saving for incomplete assessments
