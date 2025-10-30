"use client"

import { useState } from "react"
import { PersonalInfoForm } from "@/components/personal-info-form"
import { GuidelinesSection } from "@/components/guidelines-section"
import { AssessmentQuestions } from "@/components/assessment-questions"
import { ReportSummary } from "@/components/report-summary"
import { Progress } from "@/components/ui/progress"
import { Toast, useToast } from "@/components/ui/toast"
import type { PersonalInfo, AssessmentAnswer, AssessmentData } from "@/lib/api"
import { submitAssessment, calculateScores } from "@/lib/api"

export default function CyberAssessmentTool() {
  const [currentStep, setCurrentStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    jobTitle: "",
    assessmentDate: new Date().toISOString().split("T")[0],
  })
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const { toasts, showToast, removeToast } = useToast()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const handleGuidelinesNext = () => {
    setCurrentStep(2)
  }

  const handlePersonalInfoSubmit = (info: PersonalInfo) => {
    setPersonalInfo(info)
    setCurrentStep(3)
  }

  const handleAssessmentComplete = async (assessmentAnswers: AssessmentAnswer[]) => {
    setAnswers(assessmentAnswers)
    
    // Calculate scores
    const { categoryScores, overallScore } = calculateScores(assessmentAnswers)
    
    // Prepare assessment data for API submission
    const assessmentData: AssessmentData = {
      personalInfo,
      assessmentAnswers,
      scoring: {
        categoryScores,
        overallScore,
      },
      metadata: {
        assessmentVersion: "NIST CSF 2.0",
        generatedAt: new Date().toISOString(),
        totalQuestions: assessmentAnswers.length,
        answeredQuestions: assessmentAnswers.length,
        completionPercentage: 100.0,
      },
    }

    // Submit to API
    try {
      console.log('Submitting assessment data:', assessmentData)
      const result = await submitAssessment(assessmentData)
      if (result.success) {
        console.log('Assessment submitted successfully:', result.data)
        showToast('Assessment submitted successfully!', 'success')
      } else {
        console.error('Failed to submit assessment:', result.error)
        showToast(`Failed to submit assessment: ${result.error}`, 'error')
      }
    } catch (error) {
      console.error('Error submitting assessment:', error)
      showToast(`Error submitting assessment: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error')
    }

    setCurrentStep(4)
  }

  const handleRestart = () => {
    setCurrentStep(1)
    setPersonalInfo({
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      jobTitle: "",
      assessmentDate: new Date().toISOString().split("T")[0],
    })
    setAnswers([])
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}

      {/* Header */}
      <div className="w-full">
        <img
          src="https://22527425.fs1.hubspotusercontent-na2.net/hubfs/22527425/RSM%20Kuwait%20ESG/Frame%201171275999%20(1).png"
          alt="RSM Kuwait Header"
          className="w-full h-auto"
        />
      </div>

      {/* Progress Bar removed as requested */}

      {/* Main Content */}
      <div className="px-6 py-8 bg-white">
        <div className="mx-auto max-w-4xl">
          {currentStep === 1 && <GuidelinesSection onNext={handleGuidelinesNext} />}

          {currentStep === 2 && <PersonalInfoForm initialData={personalInfo} onSubmit={handlePersonalInfoSubmit} />}

          {currentStep === 3 && (
            <AssessmentQuestions onComplete={handleAssessmentComplete} onBack={() => setCurrentStep(2)} />
          )}

          {currentStep === 4 && (
            <ReportSummary personalInfo={personalInfo} answers={answers} onRestart={handleRestart} />
          )}
        </div>
      </div>
    </div>
  )
}
