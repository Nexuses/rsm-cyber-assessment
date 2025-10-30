"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PersonalInfo } from "@/lib/api"

interface PersonalInfoFormProps {
  initialData: PersonalInfo
  onSubmit: (data: PersonalInfo) => void
}

export function PersonalInfoForm({ initialData, onSubmit }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(initialData)
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<PersonalInfo> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    const emailError = validateEmail(formData.email)
    if (emailError) {
      newErrors.email = emailError
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required"
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required"
    }
    if (!formData.assessmentDate) {
      newErrors.assessmentDate = "Assessment date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      onSubmit(formData)
      setIsSubmitting(false)
    }
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) {
      return "Email is required"
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address"
    }
    
    // Check for personal email domains
    const emailParts = email.toLowerCase().split("@")
    if (emailParts.length === 2) {
      const emailDomain = emailParts[1]
      const personalEmailDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "aol.com",
        "icloud.com",
        "protonmail.com",
        "proton.me",
        "yandex.com",
        "mail.com",
        "gmx.com",
        "live.com",
        "msn.com",
        "zoho.com",
        "yahoo.co.uk",
        "yahoo.co.jp",
        "mail.ru",
        "inbox.com",
        "fastmail.com",
        "rediffmail.com"
      ]
      
      if (personalEmailDomains.includes(emailDomain)) {
        return "Please use your business email address. Personal email addresses are not allowed."
      }
    }
    return undefined
  }

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleEmailBlur = () => {
    const emailError = validateEmail(formData.email)
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }))
    }
  }

  return (
    <Card className="bg-card border border-primary/40 shadow-2xl rounded-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-card-foreground">Personal Information</CardTitle>
        <CardDescription className="text-muted-foreground">
          Please provide your information before starting the assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-card-foreground font-medium">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={(errors.firstName ? "border-destructive " : "border-[#3F9C35] ") + "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/60"}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-card-foreground font-medium">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={(errors.lastName ? "border-destructive " : "border-[#3F9C35] ") + "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/60"}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-card-foreground font-medium">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                onBlur={handleEmailBlur}
                className={(errors.email ? "border-destructive " : "border-[#3F9C35] ") + "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/60"}
                placeholder="your.email@company.com"
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-card-foreground font-medium">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
                className={(errors.companyName ? "border-destructive " : "border-[#3F9C35] ") + "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/60"}
                placeholder="Enter your company name"
              />
              {errors.companyName && <p className="text-sm text-destructive">{errors.companyName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-card-foreground font-medium">
                Job Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className={(errors.jobTitle ? "border-destructive " : "border-[#3F9C35] ") + "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/60"}
                placeholder="Enter your job title"
              />
              {errors.jobTitle && <p className="text-sm text-destructive">{errors.jobTitle}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="assessmentDate" className="text-card-foreground font-medium">
                Assessment Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="assessmentDate"
                type="date"
                value={formData.assessmentDate}
                onChange={(e) => handleInputChange("assessmentDate", e.target.value)}
                className={(errors.assessmentDate ? "border-destructive " : "border-[#3F9C35] ") + "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/60"}
              />
              {errors.assessmentDate && <p className="text-sm text-destructive">{errors.assessmentDate}</p>}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-3 text-lg font-semibold shadow-lg disabled:opacity-50 rounded-lg"
            >
              {isSubmitting ? "Submitting..." : "Continue to Questions"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
