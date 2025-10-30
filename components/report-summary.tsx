"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PersonalInfo, AssessmentAnswer } from "@/lib/api"
import { RotateCcw, Mail } from "lucide-react"

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
          <CardTitle className="text-2xl text-[#3F9C35]">Thank You for Completing the Cybersecurity Assessment</CardTitle>
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
                src="https://22527425.fs1.hubspotusercontent-na2.net/hubfs/22527425/RSM%20KUWAIT%20TAX/RSM%20cyber%20mockup.png"
                alt="Cybersecurity assessment report mockup"
                className="w-full h-auto rounded-lg border border-primary/20 shadow"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onRestart} variant="outline" size="lg" className="hover:text-white">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start New Assessment
        </Button>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mt-2 p-4 rounded-lg border border-primary/30 bg-primary/5 flex items-start gap-3">
          <div className="mt-0.5 text-primary">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="text-sm text-card-foreground">
            <span className="font-medium">Have questions about your results or next steps?</span>{" "}
            Please contact:{" "}
            <a href="mailto:cybersecurity@rsm.com.kw" className="text-primary hover:underline">
              cybersecurity@rsm.com.kw
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
