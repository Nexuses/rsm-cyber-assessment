"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Ship as Skip, Loader2 } from "lucide-react"
import type { AssessmentAnswer, AssessmentQuestion } from "@/lib/api"
import { fetchAssessmentQuestions } from "@/lib/api"

interface AssessmentQuestionsProps {
  onComplete: (answers: AssessmentAnswer[]) => void
  onBack: () => void
}

export function AssessmentQuestions({ onComplete, onBack }: AssessmentQuestionsProps) {
  const [assessmentQuestions, setAssessmentQuestions] = useState<AssessmentQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<"yes" | "partial" | "no" | "">("")
  const [currentComment, setCurrentComment] = useState("")

  // Load questions from API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true)
        const questions = await fetchAssessmentQuestions()
        setAssessmentQuestions(questions)
      } catch (error) {
        console.error('Failed to load questions:', error)
        // You might want to show an error message to the user here
      } finally {
        setLoading(false)
      }
    }

    loadQuestions()
  }, [])

  const currentQuestion = assessmentQuestions[currentQuestionIndex]
  const progress = assessmentQuestions.length > 0 ? ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100 : 0

  const handleAnswerChange = (value: "yes" | "partial" | "no") => {
    if (!currentQuestion) return

    setCurrentAnswer(value)

    // Save current answer
    const newAnswer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer: value,
      comment: currentComment.trim() || undefined,
      category: currentQuestion.categoryName,
      score: value === "yes" ? 5 : value === "partial" ? 2.5 : 0,
    }

    const updatedAnswers = answers.filter((a) => a.questionId !== currentQuestion.id)
    updatedAnswers.push(newAnswer)
    setAnswers(updatedAnswers)

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < assessmentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)

        // Load existing answer if available
        const nextQuestion = assessmentQuestions[currentQuestionIndex + 1]
        const existingAnswer = updatedAnswers.find((a) => a.questionId === nextQuestion.id)
        setCurrentAnswer(existingAnswer?.answer || "")
        setCurrentComment(existingAnswer?.comment || "")
      } else {
        // Complete assessment
        onComplete(updatedAnswers)
      }
    }, 300)
  }

  const handleSkip = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)

      // Load existing answer if available
      const nextQuestion = assessmentQuestions[currentQuestionIndex + 1]
      const existingAnswer = answers.find((a) => a.questionId === nextQuestion.id)
      setCurrentAnswer(existingAnswer?.answer || "")
      setCurrentComment(existingAnswer?.comment || "")
    } else {
      // Complete assessment even if last question is skipped
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)

      // Load previous answer
      const prevQuestion = assessmentQuestions[currentQuestionIndex - 1]
      const existingAnswer = answers.find((a) => a.questionId === prevQuestion.id)
      setCurrentAnswer(existingAnswer?.answer || "")
      setCurrentComment(existingAnswer?.comment || "")
    }
  }

  // Load existing answer when question changes
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = answers.find((a) => a.questionId === currentQuestion.id)
      setCurrentAnswer(existingAnswer?.answer || "")
      setCurrentComment(existingAnswer?.comment || "")
    }
  }, [currentQuestion, answers])

  const getCategoryColor = (category: string) => {
    const colors = {
      CG: "bg-blue-100 text-blue-800",
      ID: "bg-green-100 text-green-800",
      PR: "bg-purple-100 text-purple-800",
      DE: "bg-orange-100 text-orange-800",
      RS: "bg-red-100 text-red-800",
      RC: "bg-indigo-100 text-indigo-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <Card className="bg-card border-0 shadow-xl">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading assessment questions...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (assessmentQuestions.length === 0) {
    return (
      <Card className="bg-card border-0 shadow-xl">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-muted-foreground">Failed to load assessment questions. Please try again.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-card border-0 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-card-foreground">Assessment Questions</CardTitle>
            <CardDescription className="text-muted-foreground">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge className={getCategoryColor(currentQuestion.category)}>
              {currentQuestion.category} - {currentQuestion.categoryName}
            </Badge>
            {currentQuestion.subcategory && (
              <Badge variant="outline" className="text-xs">
                {currentQuestion.subcategory}
              </Badge>
            )}
          </div>
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-lg font-medium text-card-foreground text-balance">{currentQuestion.question}</h3>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-medium text-card-foreground">Please select your response:</Label>

          <div className="flex gap-4">
            <button
              onClick={() => handleAnswerChange("yes")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                currentAnswer === "yes"
                  ? "bg-[#2D9C2D] text-[#2D9C2D] border-[#2D9C2D]"
                  : "bg-white border-gray-200 hover:border-[#2D9C2D] hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">Yes</span>
            </button>

            <button
              onClick={() => handleAnswerChange("partial")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                currentAnswer === "partial"
                  ? "bg-yellow-400 text-yellow-600 border-yellow-400"
                  : "bg-white border-gray-200 hover:border-yellow-400 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">Partial</span>
            </button>

            <button
              onClick={() => handleAnswerChange("no")}
              className={`flex-1 p-4 rounded-lg border-2 transition-all duration-200 ${
                currentAnswer === "no"
                  ? "bg-red-500 text-red-600 border-red-500"
                  : "bg-white border-gray-200 hover:border-red-500 hover:bg-gray-50"
              }`}
            >
              <span className="font-medium">No</span>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment" className="text-base font-medium text-card-foreground">
            Additional Comments (Optional)
          </Label>
          <Textarea
            id="comment"
            value={currentComment}
            onChange={(e) => setCurrentComment(e.target.value)}
            placeholder="Please provide additional details about your current processes, tools, challenges, or concerns..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={currentQuestionIndex === 0 ? onBack : handlePrevious}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentQuestionIndex === 0 ? "Back to Guidelines" : "Previous"}
          </Button>

          <Button onClick={handleSkip} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Skip className="h-4 w-4" />
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
