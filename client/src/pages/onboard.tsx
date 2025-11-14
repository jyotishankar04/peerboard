"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Logo } from "@/components/custom/landing/logo"
import {  useNavigate, useSearchParams } from "react-router-dom"
import { useOnboardMutation } from "@/lib/query"
import { toast } from "sonner"
import Loader from "@/components/custom/utils/loader-component"
import ProtectionProvider from "@/providers/protection-provider"

// Type definitions
interface OnboardingData {
    primaryGoals: string[]
    experienceLevel: string
    areasOfInterest: string[]
    dedicationHoursPerWeek: number
    currentRole: string
    primaryProgrammingLanguage: string
}

type OnboardingField = keyof OnboardingData

// Step 1: Primary Goals
const Step1 = ({ data, updateData, onNext }: {
    data: OnboardingData
    updateData: (field: OnboardingField, value: OnboardingData[OnboardingField]) => void
    onNext: () => void
}) => {
    const goals = [
        "Master data structures & algorithms",
        "Prepare for technical interviews",
        "Improve competitive programming skills",
        "Learn system design concepts",
        "Enhance problem-solving abilities",
        "Advance my career",
        "Learn new programming languages"
    ]

    const handleGoalChange = (goal: string, checked: boolean) => {
        const currentGoals = data.primaryGoals || []
        if (checked) {
            updateData('primaryGoals', [...currentGoals, goal])
        } else {
            updateData('primaryGoals', currentGoals.filter((g: string) => g !== goal))
        }
    }

    return (
        <FieldSet>
            <FieldLegend>Welcome to Peer Board! 🎯</FieldLegend>
            <FieldDescription>
                Let's personalize your experience. What are your primary goals?
            </FieldDescription>
            <FieldSeparator />

            <Field>
                <FieldLabel>What are your primary learning goals?</FieldLabel>
                <FieldGroup className="grid grid-cols-1 gap-3 mt-4">
                    {goals.map((goal) => (
                        <div key={goal} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                            <Checkbox
                                id={`goal-${goal}`}
                                checked={data.primaryGoals?.includes(goal)}
                                onCheckedChange={(checked) => handleGoalChange(goal, checked === true)}
                            />
                            <label htmlFor={`goal-${goal}`} className="text-sm font-medium cursor-pointer flex-1">
                                {goal}
                            </label>
                        </div>
                    ))}
                </FieldGroup>
            </Field>

            <div className="flex justify-end mt-8">
                <Button
                    onClick={onNext}
                    disabled={!data.primaryGoals?.length}
                    className="px-8"
                >
                    Continue
                </Button>
            </div>
        </FieldSet>
    )
}

// Step 2: Experience Level
const Step2 = ({ data, updateData, onNext, onBack }: {
    data: OnboardingData
    updateData: (field: OnboardingField, value: OnboardingData[OnboardingField]) => void
    onNext: () => void
    onBack: () => void
}) => {
    const experienceLevels = [
        { value: "beginner", label: "Beginner", description: "Just starting with coding challenges" },
        { value: "intermediate", label: "Intermediate", description: "Solved 50+ problems, comfortable with basics" },
        { value: "advanced", label: "Advanced", description: "Regularly participate in contests" },
        { value: "expert", label: "Expert", description: "Competitive programming veteran" }
    ] as const

    return (
        <FieldSet>
            <FieldLegend>Your Coding Journey</FieldLegend>
            <FieldDescription>
                Help us understand your current level to tailor challenges
            </FieldDescription>
            <FieldSeparator />

            <Field>
                <FieldLabel>How would you describe your experience with coding challenges?</FieldLabel>
                <FieldGroup className="grid grid-cols-1 gap-3 mt-4">
                    {experienceLevels.map((level) => (
                        <div
                            key={level.value}
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${data.experienceLevel === level.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                                }`}
                            onClick={() => updateData('experienceLevel', level.value)}
                        >
                            <div className="flex items-center h-5">
                                <div className={`w-4 h-4 rounded-full border-2 ${data.experienceLevel === level.value
                                    ? 'border-primary bg-primary'
                                    : 'border-muted-foreground'
                                    }`} />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">{level.label}</div>
                                <div className="text-xs text-muted-foreground mt-1">{level.description}</div>
                            </div>
                        </div>
                    ))}
                </FieldGroup>
            </Field>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext} disabled={!data.experienceLevel}>
                    Continue
                </Button>
            </div>
        </FieldSet>
    )
}

// Step 3: Area of Interest
const Step3 = ({ data, updateData, onNext, onBack }: {
    data: OnboardingData
    updateData: (field: OnboardingField, value: OnboardingData[OnboardingField]) => void
    onNext: () => void
    onBack: () => void
}) => {
    const interests = [
        "Arrays & Strings",
        "Dynamic Programming",
        "Graph Theory",
        "Tree Data Structures",
        "Recursion & Backtracking",
        "Greedy Algorithms",
        "System Design",
        "Object-Oriented Design",
        "Database Design",
        "Concurrency",
        "Machine Learning",
        "Web Development",
        "Mobile Development",
        "DevOps & Infrastructure"
    ]

    const handleInterestChange = (interest: string, checked: boolean) => {
        const currentInterests = data.areasOfInterest || []
        if (checked) {
            updateData('areasOfInterest', [...currentInterests, interest])
        } else {
            updateData('areasOfInterest', currentInterests.filter((i: string) => i !== interest))
        }
    }

    return (
        <FieldSet>
            <FieldLegend>Areas of Interest</FieldLegend>
            <FieldDescription>
                Select topics and domains you're interested in
            </FieldDescription>
            <FieldSeparator />

            <Field>
                <FieldLabel>Which areas interest you most?</FieldLabel>
                <FieldGroup className="grid grid-cols-2 gap-3 mt-4">
                    {interests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                                id={`interest-${interest}`}
                                checked={data.areasOfInterest?.includes(interest)}
                                onCheckedChange={(checked) => handleInterestChange(interest, checked === true)}
                            />
                            <label htmlFor={`interest-${interest}`} className="text-sm font-medium cursor-pointer">
                                {interest}
                            </label>
                        </div>
                    ))}
                </FieldGroup>
            </Field>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext} disabled={!data.areasOfInterest?.length}>
                    Continue
                </Button>
            </div>
        </FieldSet>
    )
}

// Step 4: Time Commitment
const Step4 = ({ data, updateData, onNext, onBack }: {
    data: OnboardingData
    updateData: (field: OnboardingField, value: OnboardingData[OnboardingField]) => void
    onNext: () => void
    onBack: () => void
}) => {
    const timeOptions = [
        { value: 1, label: "1 hour/week", description: "Casual learning" },
        { value: 3, label: "3 hours/week", description: "Regular practice" },
        { value: 5, label: "5 hours/week", description: "Serious commitment" },
        { value: 10, label: "10 hours/week", description: "Dedicated learning" },
        { value: 15, label: "15+ hours/week", description: "Intensive study" }
    ]

    return (
        <FieldSet>
            <FieldLegend>Time Commitment</FieldLegend>
            <FieldDescription>
                How much time can you dedicate to learning each week?
            </FieldDescription>
            <FieldSeparator />

            <Field>
                <FieldLabel>Weekly dedication hours</FieldLabel>
                <FieldGroup className="grid grid-cols-1 gap-3 mt-4">
                    {timeOptions.map((option) => (
                        <div
                            key={option.value}
                            className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${data.dedicationHoursPerWeek === option.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                                }`}
                            onClick={() => updateData('dedicationHoursPerWeek', option.value)}
                        >
                            <div className="flex items-center h-5">
                                <div className={`w-4 h-4 rounded-full border-2 ${data.dedicationHoursPerWeek === option.value
                                    ? 'border-primary bg-primary'
                                    : 'border-muted-foreground'
                                    }`} />
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">{option.label}</div>
                                <div className="text-xs text-muted-foreground mt-1">{option.description}</div>
                            </div>
                        </div>
                    ))}
                </FieldGroup>
            </Field>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext} disabled={!data.dedicationHoursPerWeek}>
                    Continue
                </Button>
            </div>
        </FieldSet>
    )
}

// Step 5: Final Details
const Step5 = ({ data, updateData, onSubmit, onBack }: {
    data: OnboardingData
    updateData: (field: OnboardingField, value: OnboardingData[OnboardingField]) => void
    onSubmit: () => void
    onBack: () => void
}) => {
    const roleOptions = [
        "Student",
        "Software Engineer",
        "Frontend Developer",
        "Backend Developer",
        "Full-stack Developer",
        "Data Scientist",
        "DevOps Engineer",
        "Product Manager",
        "Looking for Job",
        "Career Changer",
        "Hobbyist"
    ] as const

    const languages = [
        "Python",
        "JavaScript",
        "TypeScript",
        "Java",
        "C++",
        "C#",
        "Go",
        "Rust",
        "Swift",
        "Kotlin",
        "PHP",
        "Ruby",
        "Other"
    ] as const

    return (
        <FieldSet>
            <FieldLegend>Complete Your Profile 🚀</FieldLegend>
            <FieldDescription>
                Final details to personalize your learning experience
            </FieldDescription>
            <FieldSeparator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                    <FieldLabel>Current role</FieldLabel>
                    <Select
                        value={data.currentRole}
                        onValueChange={(value: string) => updateData('currentRole', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roleOptions.map((role) => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel>Primary programming language</FieldLabel>
                    <Select
                        value={data.primaryProgrammingLanguage}
                        onValueChange={(value: string) => updateData('primaryProgrammingLanguage', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((language) => (
                                <SelectItem key={language} value={language}>{language}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg mt-6">
                <h4 className="font-medium text-sm mb-2">Profile Summary</h4>
                <div className="text-xs text-muted-foreground space-y-1">
                    <div><strong>Goals:</strong> {data.primaryGoals?.join(', ') || 'None selected'}</div>
                    <div><strong>Experience:</strong> {data.experienceLevel || 'Not specified'}</div>
                    <div><strong>Interests:</strong> {data.areasOfInterest?.join(', ') || 'None selected'}</div>
                    <div><strong>Weekly hours:</strong> {data.dedicationHoursPerWeek || 'Not specified'}</div>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button
                    onClick={onSubmit}
                    disabled={!data.currentRole || !data.primaryProgrammingLanguage}
                    className="px-8"
                >
                    Complete Setup
                </Button>
            </div>
        </FieldSet>
    )
}

const OnboardPage = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [currentStep, setCurrentStep] = useState(1)
    const [isAnimating, setIsAnimating] = useState(false)
    const { mutateAsync: onboard, isPending: isOnboarding, isSuccess: isOnboarded, isError: onboardError } = useOnboardMutation()


    const [formData, setFormData] = useState<OnboardingData>({
        primaryGoals: [],
        experienceLevel: "",
        areasOfInterest: [],
        dedicationHoursPerWeek: 0,
        currentRole: "",
        primaryProgrammingLanguage: ""
    })

    // Initialize step from URL or default to 1
    useEffect(() => {
        const stepParam = searchParams.get('step')
        const step = stepParam ? parseInt(stepParam, 10) : 1
        if (step >= 1 && step <= 5) {
            setCurrentStep(step)
        }
    }, [searchParams])

    // Update URL when step changes
    useEffect(() => {
        const url = new URL(window.location.href)
        url.searchParams.set('step', currentStep.toString())
        window.history.replaceState({}, '', url.toString())
    }, [currentStep])

    useEffect(() => {
        if (isOnboarded) {
            toast.success("Onboarding completed successfully!")
            navigate('/app/dashboard')
        }
    }, [isOnboarded, navigate])
    useEffect(() => {
        if (onboardError) {
            toast.error("Onboarding failed!")
            console.error("Onboarding failed:", onboardError);
        }
    }, [onboardError])
    if (isOnboarding) {
        return (
            <Loader text="Completing onboarding..." />
        )
    }

    const updateFormData = (field: OnboardingField, value: OnboardingData[OnboardingField]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleStepChange = (newStep: number) => {
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentStep(newStep)
            setIsAnimating(false)
        }, 300)
    }

    const handleNext = () => {
        if (currentStep < 5) {
            handleStepChange(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            handleStepChange(currentStep - 1)
        }
    }

    const handleSubmit = async () => {
        await onboard(formData);
    }


    const renderStep = () => {
        const stepProps = {
            data: formData,
            updateData: updateFormData,
            onNext: handleNext,
            onBack: handleBack,
        }

        switch (currentStep) {
            case 1:
                return <Step1 {...stepProps} />
            case 2:
                return <Step2 {...stepProps} />
            case 3:
                return <Step3 {...stepProps} />
            case 4:
                return <Step4 {...stepProps} />
            case 5:
                return <Step5 {...stepProps} onSubmit={handleSubmit} />
            default:
                return null
        }
    }

    return (
        <ProtectionProvider>
            <div className="flex min-h-screen flex-col items-center bg-linear-to-br from-background to-muted px-4 py-8 md:py-16">
                <div className="w-full max-w-2xl">
                    <div className="scale-125 mb-8 flex justify-center">
                        <Logo />
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-foreground">
                                Step {currentStep} of 5
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {Math.round((currentStep / 5) * 100)}% complete
                            </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                                className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(currentStep / 5) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Animated Step Content */}
                    <div
                        className={`transition-all duration-300 transform ${isAnimating
                            ? 'opacity-0 translate-x-4'
                            : 'opacity-100 translate-x-0'
                            }`}
                    >
                        {renderStep()}
                    </div>
                </div>
            </div>
        </ProtectionProvider>
    )
}

export default OnboardPage