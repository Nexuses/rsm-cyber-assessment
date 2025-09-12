"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Ship as Skip } from "lucide-react"
import type { AssessmentAnswer } from "@/app/page"

interface AssessmentQuestionsProps {
  onComplete: (answers: AssessmentAnswer[]) => void
  onBack: () => void
}

const assessmentQuestions = [
  // Cyber Governance - Risk Management
  {
    id: "cg-rm-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Risk Management",
    question:
      "Does your organization aggregate and manage cybersecurity risks alongside other enterprise risks (e.g., compliance, financial, operational, regulatory, reputational, safety)?",
  },
  {
    id: "cg-rm-2",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Risk Management",
    question:
      "Do all departments across the organization - such as management, operations, internal auditors, legal, acquisition, physical security, and HR - communicate with each other about cybersecurity risks and its management?",
  },
  {
    id: "cg-rm-3",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Risk Management",
    question:
      "How does your organization document cybersecurity risk information (e.g., risk description, score, exposure, treatment, and ownership) and controls?",
  },

  // Cyber Governance - Roles and Responsibilities
  {
    id: "cg-rr-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Roles and Responsibilities",
    question:
      "Are all roles, responsibilities, and authorities related to cybersecurity risk management established, communicated, understood, and enforced in your organization?",
  },

  // Cyber Governance - Policy
  {
    id: "cg-p-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Policy",
    question:
      "Does your organization have established cybersecurity policies which are periodically reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission?",
  },
  {
    id: "cg-p-2",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Policy",
    question:
      "From the list below, please select the cybersecurity policies documented and enforced in your organization?",
  },

  // Cyber Governance - Cybersecurity Supply Chain Risk Management
  {
    id: "cg-scrm-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cybersecurity Supply Chain Risk Management",
    question:
      "Is there an established cybersecurity supply chain risk management program in your organization, including a plan (with milestones), policies, and procedures that guide implementation and improvement of the program?",
  },
  {
    id: "cg-scrm-2",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cybersecurity Supply Chain Risk Management",
    question:
      "Does your organization maintain a record of all suppliers, prioritized based on criticality related to for example, the sensitivity of data processed or degree of access to your organization's systems?",
  },
  {
    id: "cg-scrm-3",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cybersecurity Supply Chain Risk Management",
    question:
      "Does your organization conduct security risk assessments for new and periodically for existing suppliers?",
  },

  // Cyber Governance - Regulatory Landscape
  {
    id: "cg-rl-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Regulatory Landscape",
    question:
      "Legal, regulatory, and contractual requirements regarding cybersecurity - including privacy and civil liberties obligations - are understood and managed?",
  },

  // Cyber Governance - Cyber Metrics
  {
    id: "cg-cm-1",
    category: "CG",
    categoryName: "Cyber Governance",
    subcategory: "Cyber Metrics",
    question:
      "Has your organization established cybersecurity risk metrics which is being tracked and reported on a periodic basis?",
  },

  // Identify - Asset Management
  {
    id: "id-am-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Asset Management",
    question:
      "Does your organization maintain and manage inventories of all hardware (like servers, network devices, laptops), software (custom applications, APIs) and services (like cloud hosting, application testing)?",
  },
  {
    id: "id-am-2",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Asset Management",
    question: "How does your organization document and manage this inventory?",
  },

  // Identify - Risk Assessment
  {
    id: "id-ra-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Risk Assessment",
    question:
      "Does your organization use vulnerability management technologies to identify unpatched and misconfigured software?",
  },
  {
    id: "id-ra-2",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Risk Assessment",
    question:
      "Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization, and risk responses are chosen, prioritized, planned, tracked, and communicated?",
  },
  {
    id: "id-ra-3",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Risk Assessment",
    question: "Do all changes and exceptions are managed, assessed for risk impact, recorded, and tracked?",
  },

  // Identify - Cyber PT
  {
    id: "id-cpt-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Cyber PT",
    question:
      "Does your organization conduct penetration testing to identify opportunities to improve the security posture of selected high-risk systems?",
  },

  // Identify - Improvement
  {
    id: "id-i-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Improvement",
    question:
      "Are improvements identified for future business continuity, DR and incident response activities based on tabletop exercise, simulations, drills and tests conducted?",
  },
  {
    id: "id-i-2",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Improvement",
    question:
      "Are contingency plans (e.g., incident response, business continuity, disaster recovery) established for responding to and recovering from adverse events?",
  },

  // Identify - Privacy
  {
    id: "id-p-1",
    category: "ID",
    categoryName: "Identify",
    subcategory: "Privacy",
    question:
      "Has your organization created a map / database of Personally Identifiable Information (PII) lifecycle, capturing the privacy risk and controls for each such data flow?",
  },

  // Protect - IAM
  {
    id: "pr-iam-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question:
      "Identities and credentials for authorized users, services, and hardware are managed by the organization?",
  },
  {
    id: "pr-iam-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question:
      "Does your organization authenticate all users and services (using passwords, multi-factor authentication)?",
  },
  {
    id: "pr-iam-3",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question: "Does your organization review logical and physical access privileges periodically and ad-hoc basis?",
  },
  {
    id: "pr-iam-4",
    category: "PR",
    categoryName: "Protect",
    subcategory: "IAM",
    question: "How does your organization promptly rescind privileges that are no longer needed?",
  },

  // Protect - Awareness and Training
  {
    id: "pr-at-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question:
      "Employees are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind?",
  },
  {
    id: "pr-at-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "What is the frequency of such trainings?",
  },
  {
    id: "pr-at-3",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Are the trainings provided by any service provider?",
  },
  {
    id: "pr-at-4",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Is a platform / tool is used for such training and awareness programs?",
  },
  {
    id: "pr-at-5",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Are role based security training conducted?",
  },
  {
    id: "pr-at-6",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Awareness and Training",
    question: "Are phishing simulation exercises conducted with continuous measures to improve the risk score?",
  },

  // Protect - Data Security
  {
    id: "pr-ds-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Data Security",
    question:
      "Encryption, digital signatures, and cryptographic hashes used to protect the confidentiality and integrity of stored data in files, databases, virtual machine disk images, container images, and other resources?",
  },
  {
    id: "pr-ds-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Data Security",
    question:
      "Do outbound emails and other communications that contain sensitive data blocked or encrypted, depending on the data classification?",
  },
  {
    id: "pr-ds-3",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Data Security",
    question: "Backups of data are created, protected, maintained, and tested?",
  },

  // Protect - Platform Security
  {
    id: "pr-ps-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Platform Security",
    question:
      "Are hardened baselines established, tested, deployed, and maintained to enforce the organization's cybersecurity policies and provide only essential capabilities (i.e., principle of least functionality)?",
  },
  {
    id: "pr-ps-2",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Platform Security",
    question:
      "Are routine and emergency patching performed within the timeframes specified in the vulnerability management plan?",
  },

  // Protect - Technology Infrastructure Resilience
  {
    id: "pr-tir-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Technology Infrastructure Resilience",
    question:
      "Are organization networks and cloud-based platforms logically segmented according to trust boundaries and platform types (e.g., IT, IoT, OT, mobile, guests) to permit only the necessary communications?",
  },

  // Protect - Capacity Management
  {
    id: "pr-cm-1",
    category: "PR",
    categoryName: "Protect",
    subcategory: "Capacity Management",
    question:
      "Is the usage of storage, power, compute, network bandwidth, and other resources monitored to ensure adequate resource capacity?",
  },

  // Detect - Continuous Monitoring
  {
    id: "de-cm-1",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Networks and network services are monitored to find potentially adverse events?",
  },
  {
    id: "de-cm-2",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question:
      "Logs are monitored from physical access control systems (e.g., badge readers) to find unusual access patterns (e.g., deviations from the norm) and failed access attempts?",
  },
  {
    id: "de-cm-3",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "Behavior analytics software is used to detect anomalous user activity to mitigate insider threats?",
  },
  {
    id: "de-cm-4",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question:
      "Logs from logical access control systems are monitored to find unusual access patterns and failed access attempts?",
  },
  {
    id: "de-cm-5",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question: "External service provider activities and services are monitored to find potentially adverse events?",
  },
  {
    id: "de-cm-6",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question:
      "Does your organization monitor email, web, file sharing, collaboration services, and other common attack vectors to detect malware, phishing, data leaks and exfiltration, and other adverse events?",
  },
  {
    id: "de-cm-7",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question:
      "Does your organization use technologies with a presence on endpoints to detect cyber health issues (e.g., missing patches, malware infections, unauthorized software)?",
  },
  {
    id: "de-cm-8",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Continuous Monitoring",
    question:
      "Does your organization use security information and event management (SIEM) or other tools to continuously monitor log events for known malicious and suspicious activity?",
  },

  // Detect - Adverse Event Analysis
  {
    id: "de-aea-1",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Adverse Event Analysis",
    question:
      "Is security information and event management (SIEM) or other tools deployed to continuously monitor log events for known malicious and suspicious activity?",
  },
  {
    id: "de-aea-2",
    category: "DE",
    categoryName: "Detect",
    subcategory: "Adverse Event Analysis",
    question: "Cyber threat intelligence feeds are provided to detection technologies, processes, and personnel?",
  },

  // Respond - Incident Management
  {
    id: "rs-im-1",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Management",
    question:
      "The incident response plan is executed in coordination with relevant third parties once an incident is declared?",
  },
  {
    id: "rs-im-2",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Management",
    question:
      "Incidents are categorized based on type (e.g., data breach, ransomware, DDoS, account compromise) and prioritized based on their scope, likely impact, and time-critical nature?",
  },
  {
    id: "rs-im-3",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Management",
    question:
      "Analysis is performed to establish what has taken place during an incident and the root cause of the incident?",
  },

  // Respond - Breach Notification
  {
    id: "rs-bn-1",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Breach Notification",
    question: "Does the organization have a breach notification procedure in place?",
  },

  // Respond - Incident Containment
  {
    id: "rs-ic-1",
    category: "RS",
    categoryName: "Respond",
    subcategory: "Incident Containment",
    question:
      "Does the organization have cybersecurity technologies (e.g., antivirus software), cybersecurity features of other technologies (e.g., operating systems, network infrastructure devices) or a service provider to automatically perform incident containment actions?",
  },

  // Recover - Incident Recovery
  {
    id: "rc-ir-1",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question:
      "Periodically tests and exercises are performed to assess all individuals with recovery responsibilities are aware of the plans for recovery, and the authorizations required to implement each aspect of the plans?",
  },
  {
    id: "rc-ir-2",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question:
      "Periodically tests are performed to verify the integrity of backups and other restoration assets before using them for restoration?",
  },
  {
    id: "rc-ir-3",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question:
      "Periodically tests are performed to verify the integrity of restored assets, restoration of the systems and services, and confirmation of normal operating status?",
  },
  {
    id: "rc-ir-4",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question:
      "Report of the test or exercise conducted is prepared documenting the incident, the response and recovery actions taken, and lessons learned?",
  },
  {
    id: "rc-ir-5",
    category: "RC",
    categoryName: "Recover",
    subcategory: "Incident Recovery",
    question:
      "Are business continuity tests performed to validate that essential services are restored in the appropriate order as per the business impact and system categorization records (including service delivery objectives)?",
  },
]

export function AssessmentQuestions({ onComplete, onBack }: AssessmentQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<"yes" | "partial" | "no" | "">("")
  const [currentComment, setCurrentComment] = useState("")

  const currentQuestion = assessmentQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100

  const handleAnswerChange = (value: "yes" | "partial" | "no") => {
    setCurrentAnswer(value)

    // Save current answer
    const newAnswer: AssessmentAnswer = {
      questionId: currentQuestion.id,
      answer: value,
      comment: currentComment.trim() || undefined,
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

  // Load existing answer when component mounts or question changes
  useState(() => {
    const existingAnswer = answers.find((a) => a.questionId === currentQuestion.id)
    setCurrentAnswer(existingAnswer?.answer || "")
    setCurrentComment(existingAnswer?.comment || "")
  })

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
