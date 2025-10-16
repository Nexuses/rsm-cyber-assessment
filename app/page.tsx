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

  const handlePersonalInfoSubmit = (info: PersonalInfo) => {
    setPersonalInfo(info)
    setCurrentStep(2)
  }

  const handleGuidelinesNext = () => {
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
      <div className="bg-primary text-white">
        <div className="px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-balance">Cyber Self Assessment Tool</h1>
                <p className="mt-2 text-lg text-primary-foreground/80">NIST CSF 2.0 Based Assessment</p>
              </div>
              <div className="flex items-center">
                <img
                  src="https://cdn-nexlink.s3.us-east-2.amazonaws.com/rsm-international-vector-logo_2_eb7fb9d1-228a-426a-b682-c0d24dc736fa.jpg"
                  alt="RSM International Logo"
                  className="h-16 w-auto border-2 border-gray-300 p-2 rounded bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-muted px-6 py-4 border-b">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between text-muted-foreground text-sm mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 bg-white">
        <div className="mx-auto max-w-4xl">
          {currentStep === 1 && <PersonalInfoForm initialData={personalInfo} onSubmit={handlePersonalInfoSubmit} />}

          {currentStep === 2 && <GuidelinesSection onNext={handleGuidelinesNext} />}

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
