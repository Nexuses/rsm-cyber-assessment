"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PersonalInfo } from "@/app/page"

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
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
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

  const submitToAPI = async (data: PersonalInfo) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://5bfe6b98616c4954acb4cb09b2abb6.70.environment.api.powerplatform.com/powerautomate/automations/direct/workflows/05c19af3d01f4163a1bb54363eac16cf/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=UlW5W3SrBYr6HRAUMJtOGPXIdKxzMfT_e9wPbPk7b8E"
    
    console.log('Sending data to API:', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      companyName: data.companyName,
      jobTitle: data.jobTitle
    })
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          companyName: data.companyName,
          jobTitle: data.jobTitle
        })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      console.log('Data submitted successfully to API')
    } catch (error) {
      console.error('Error submitting to API:', error)
      // Continue with form submission even if API fails
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        await submitToAPI(formData)
        onSubmit(formData)
      } catch (error) {
        console.error('Error during form submission:', error)
        // Still proceed with form submission even if API fails
        onSubmit(formData)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card className="bg-card border-0 shadow-xl">
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
                className={errors.firstName ? "border-destructive" : ""}
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
                className={errors.lastName ? "border-destructive" : ""}
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
                className={errors.email ? "border-destructive" : ""}
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
                className={errors.companyName ? "border-destructive" : ""}
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
                className={errors.jobTitle ? "border-destructive" : ""}
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
                className={errors.assessmentDate ? "border-destructive" : ""}
              />
              {errors.assessmentDate && <p className="text-sm text-destructive">{errors.assessmentDate}</p>}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-3 text-lg font-semibold shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Start Assessment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
