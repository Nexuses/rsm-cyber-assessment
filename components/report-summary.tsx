"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { PersonalInfo, AssessmentAnswer, CategoryScore, OverallScore } from "@/lib/api"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { RotateCcw, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

interface ReportSummaryProps {
  personalInfo: PersonalInfo
  answers: AssessmentAnswer[]
  onRestart: () => void
}

export function ReportSummary({ personalInfo, answers, onRestart }: ReportSummaryProps) {
  // Calculate scores by category using the new structure
  const categoryScores: Record<string, CategoryScore> = {
    CG: { name: "Cyber Governance", total: 0, max: 0, questions: 0, percentage: 0 },
    ID: { name: "Identify", total: 0, max: 0, questions: 0, percentage: 0 },
    PR: { name: "Protect", total: 0, max: 0, questions: 0, percentage: 0 },
    DE: { name: "Detect", total: 0, max: 0, questions: 0, percentage: 0 },
    RS: { name: "Respond", total: 0, max: 0, questions: 0, percentage: 0 },
    RC: { name: "Recover", total: 0, max: 0, questions: 0, percentage: 0 },
  }

  let totalScore = 0
  let maxPossibleScore = 0

  answers.forEach((answer) => {
    const category = answer.questionId.split("-")[0].toUpperCase()
    if (categoryScores[category]) {
      const score = answer.score
      categoryScores[category].total += score
      categoryScores[category].max += 5
      categoryScores[category].questions += 1
      totalScore += score
      maxPossibleScore += 5
    }
  })

  // Calculate percentages
  Object.values(categoryScores).forEach(category => {
    category.percentage = category.max > 0 ? (category.total / category.max) * 100 : 0
  })

  const overallPercentage = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0

  // Prepare chart data
  const chartData = Object.entries(categoryScores).map(([key, value]) => ({
    category: key,
    name: value.name,
    score: value.total,
    percentage: value.max > 0 ? (value.total / value.max) * 100 : 0,
    maxScore: value.max,
  }))

  const pieData = [
    { name: "Achieved", value: totalScore, color: "#2D9C2D" },
    { name: "Remaining", value: maxPossibleScore - totalScore, color: "#009CD9" },
  ]

  const getMaturityLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Advanced", color: "text-green-700", icon: CheckCircle }
    if (percentage >= 60) return { level: "Intermediate", color: "text-yellow-700", icon: AlertTriangle }
    if (percentage >= 40) return { level: "Basic", color: "text-orange-700", icon: AlertTriangle }
    return { level: "Initial", color: "text-red-700", icon: XCircle }
  }

  const maturity = getMaturityLevel(overallPercentage)
  const MaturityIcon = maturity.icon


  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="bg-card border-0 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground">Assessment Report Summary</CardTitle>
          <CardDescription className="text-muted-foreground">
            Cybersecurity Maturity Assessment based on NIST CSF 2.0
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold text-card-foreground mb-3">Assessment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Organization:</strong> {personalInfo.companyName}
              </div>
              <div>
                <strong>Assessed by:</strong> {personalInfo.firstName} {personalInfo.lastName}
              </div>
              <div>
                <strong>Job Title:</strong> {personalInfo.jobTitle}
              </div>
              <div>
                <strong>Assessment Date:</strong> {new Date(personalInfo.assessmentDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-4 rounded-lg">
              <MaturityIcon className={`h-8 w-8 ${maturity.color}`} />
              <div>
                <div className="text-2xl font-bold text-card-foreground">{overallPercentage.toFixed(1)}%</div>
                <div className={`text-lg font-semibold ${maturity.color}`}>{maturity.level} Maturity</div>
              </div>
            </div>
            <p className="text-muted-foreground">
              Overall Score: {totalScore} out of {maxPossibleScore} points
            </p>
            <Progress value={overallPercentage} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-card border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[0, 100]} />
                <Tooltip
                  formatter={(value: number) => [`${value.toFixed(1)}%`, "Score"]}
                  labelFormatter={(label) => {
                    const item = chartData.find((d) => d.category === label)
                    return item ? `${item.category} - ${item.name}` : label
                  }}
                />
                <Bar dataKey="percentage" fill="#2D9C2D" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chartData.map((category) => (
              <div key={category.category} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{category.category}</Badge>
                  <span className="text-sm font-medium">
                    {category.score}/{category.maxScore}
                  </span>
                </div>
                <h4 className="font-medium text-card-foreground">{category.name}</h4>
                <Progress value={category.percentage} className="mt-2 h-2" />
                <p className="text-sm text-muted-foreground mt-1">{category.percentage.toFixed(1)}% Complete</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card className="bg-card border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value} points`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#2D9C2D" }}></div>
              <span className="text-sm">Achieved ({totalScore} pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: "#009CD9" }}></div>
              <span className="text-sm">Remaining ({maxPossibleScore - totalScore} pts)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center">
        <Button onClick={onRestart} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-5 w-5" />
          Start New Assessment
        </Button>
      </div>
    </div>
  )
}
