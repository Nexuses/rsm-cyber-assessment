"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PersonalInfo, AssessmentAnswer } from "@/lib/api"
import { RotateCcw } from "lucide-react"

interface ReportSummaryProps {
  personalInfo: PersonalInfo
  answers: AssessmentAnswer[]
  onRestart: () => void
}

export function ReportSummary({ personalInfo, answers, onRestart }: ReportSummaryProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-card border border-primary/40 shadow-2xl rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground">Thank You for Completing the Cybersecurity Assessment</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your responses have been successfully submitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <p className="text-card-foreground">
              A summary report of your organisation’s cybersecurity assessment will be shared with you shortly by email.
            </p>
            <div className="w-full">
              <img
                src="https://22527425.fs1.hubspotusercontent-na2.net/hubfs/22527425/RSM%20Kuwait%20ESG/Cybersecurity%20assessment%20report%20(1).png"
                alt="Cybersecurity assessment report mockup"
                className="w-full h-auto rounded-lg border border-primary/20 shadow"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onRestart} variant="outline" size="lg" className="hover:text-secondary">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start New Assessment
        </Button>
      </div>
    </div>
  )
}
