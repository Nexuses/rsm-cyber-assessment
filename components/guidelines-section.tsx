"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Info, ArrowRight } from "lucide-react"

interface GuidelinesSectionProps {
  onNext: () => void
}

export function GuidelinesSection({ onNext }: GuidelinesSectionProps) {
  const nistDomains = [
    {
      code: "CG",
      name: "Cyber Governance",
      description:
        "The organization's cybersecurity risk management strategy, expectations, and policy are established, communicated, and monitored",
    },
    {
      code: "ID",
      name: "Identify",
      description: "The organization's current cybersecurity risks are understood",
    },
    {
      code: "PR",
      name: "Protect",
      description: "Safeguards to manage the organization's cybersecurity risks are used",
    },
    {
      code: "DE",
      name: "Detect",
      description: "Possible cybersecurity attacks and compromises are found and analyzed",
    },
    {
      code: "RS",
      name: "Respond",
      description: "Actions regarding a detected cybersecurity incident are taken",
    },
    {
      code: "RC",
      name: "Recover",
      description: "Assets and operations affected by a cybersecurity incident are restored",
    },
  ]

  return (
    <Card className="bg-card border border-primary/40 shadow-2xl rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-card-foreground">Assessment Guidelines</CardTitle>
        <CardDescription className="text-muted-foreground">
          Please review these guidelines before starting your assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* NIST CSF Domains */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            NIST CSF 2.0 Domains
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nistDomains.map((domain) => (
              <div key={domain.code} className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {domain.code}
                  </Badge>
                  <div>
                    <h4 className="font-medium text-card-foreground">{domain.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{domain.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Instructions */}
        <div className="p-6 rounded-lg border border-primary/20 bg-primary/5">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            Assessment Instructions
          </h3>
          <div className="space-y-3 text-muted-foreground">
            <p>
              <strong>1.</strong> This is a 'light', abridged version of cybersecurity assessment based on the NIST CSF
              2.0.
            </p>
            <p>
              <strong>2.</strong> You need to select either one or multiple responses from the multiple choice
              questions.
            </p>
            <p>
              <strong>3.</strong> Most questions will have three options: <strong>Yes</strong>, <strong>Partial</strong>
              , or <strong>No</strong>.
            </p>
            <p>
              <strong>4.</strong> Scoring is based on a 5-point tier:
            </p>
            <ul className="ml-6 space-y-1">
              <li>
                • <strong>Yes</strong> = 5 points (full implementation)
              </li>
              <li>
                • <strong>Partial</strong> = 2.5 points (partial implementation)
              </li>
              <li>
                • <strong>No</strong> = 0 points (no implementation)
              </li>
            </ul>
            <p>
              <strong>5.</strong> After completion, you will receive an assessment report with executive summary,
              scores, and detailed analysis.
            </p>
            <p>
              <strong>6.</strong> Please provide additional details in the comment boxes to help us understand your
              current processes and challenges.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/40">
          <p className="text-sm text-card-foreground">
            <strong>Need help?</strong> For any guidance in completing the assessment, please contact:{" "}
            <a href="mailto:bhaskar.maheshwari@rsm.com.kw" className="text-primary hover:underline">
              bhaskar.maheshwari@rsm.com.kw
            </a>
          </p>
        </div>

        <div className="flex justify-center pt-6">
          <Button
            onClick={onNext}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-12 py-3 text-lg font-semibold rounded-lg shadow-lg"
          >
            Begin Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
