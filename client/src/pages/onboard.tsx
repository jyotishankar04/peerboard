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
import { Textarea } from "@/components/ui/textarea"
import { Logo } from "@/components/custom/landing/logo"
import { useNavigate, useSearchParams } from "react-router-dom"

// Type definitions
interface OnboardingData {
    goals: string[]
    experienceLevel: string
    interests: string[]
    status: string
    programmingLanguages: string[]
    timeCommitment: string
    preferredLearning: string[]
    additionalNotes?: string
}

type OnboardingField = keyof OnboardingData

// Step 1: Welcome & Goals
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
        "Enhance problem-solving abilities"
    ]

    const handleGoalChange = (goal: string, checked: boolean) => {
        const currentGoals = data.goals || []
        if (checked) {
            updateData('goals', [...currentGoals, goal])
        } else {
            updateData('goals', currentGoals.filter((g: string) => g !== goal))
        }
    }

    return (
        <FieldSet>
            <FieldLegend>Welcome to Peer Board! 🎯</FieldLegend>
            <FieldDescription>
                Let's personalize your experience. What brings you here?
            </FieldDescription>
            <FieldSeparator />

            <Field>
                <FieldLabel>What are your primary learning goals?</FieldLabel>
                <FieldGroup className="grid grid-cols-1 gap-3 mt-4">
                    {goals.map((goal) => (
                        <div key={goal} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                            <Checkbox
                                id={`goal-${goal}`}
                                checked={data.goals?.includes(goal)}
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
                    disabled={!data.goals?.length}
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

// Step 3: Interests & Focus Areas
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
        "Concurrency"
    ]

    const handleInterestChange = (interest: string, checked: boolean) => {
        const currentInterests = data.interests || []
        if (checked) {
            updateData('interests', [...currentInterests, interest])
        } else {
            updateData('interests', currentInterests.filter((i: string) => i !== interest))
        }
    }

    return (
        <FieldSet>
            <FieldLegend>Focus Areas</FieldLegend>
            <FieldDescription>
                Select topics you want to focus on improving
            </FieldDescription>
            <FieldSeparator />

            <Field>
                <FieldLabel>Which areas interest you most?</FieldLabel>
                <FieldGroup className="grid grid-cols-2 gap-3 mt-4">
                    {interests.map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                                id={`interest-${interest}`}
                                checked={data.interests?.includes(interest)}
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
                <Button onClick={onNext} disabled={!data.interests?.length}>
                    Continue
                </Button>
            </div>
        </FieldSet>
    )
}

// Step 4: Learning Preferences
const Step4 = ({ data, updateData, onNext, onBack }: {
    data: OnboardingData
    updateData: (field: OnboardingField, value: OnboardingData[OnboardingField]) => void
    onNext: () => void
    onBack: () => void
}) => {
    const learningStyles = [
        "Practice with timed challenges",
        "Study with video explanations",
        "Join study groups",
        "Compete in contests",
        "Review others' solutions",
        "Work on real-world projects"
    ]

    const timeOptions = [
        "1-5 hours/week",
        "5-10 hours/week",
        "10-20 hours/week",
        "20+ hours/week"
    ] as const

    const handleLearningStyleChange = (style: string, checked: boolean) => {
        const currentStyles = data.preferredLearning || []
        if (checked) {
            updateData('preferredLearning', [...currentStyles, style])
        } else {
            updateData('preferredLearning', currentStyles.filter((s: string) => s !== style))
        }
    }

    return (
        <FieldSet>
            <FieldLegend>Learning Style</FieldLegend>
            <FieldDescription>
                How do you prefer to learn and practice?
            </FieldDescription>
            <FieldSeparator />

            <Field>
                <FieldLabel>Preferred learning methods:</FieldLabel>
                <FieldGroup className="grid grid-cols-1 gap-3 mt-4">
                    {learningStyles.map((style) => (
                        <div key={style} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                            <Checkbox
                                id={`style-${style}`}
                                checked={data.preferredLearning?.includes(style)}
                                onCheckedChange={(checked) => handleLearningStyleChange(style, checked === true)}
                            />
                            <label htmlFor={`style-${style}`} className="text-sm font-medium cursor-pointer flex-1">
                                {style}
                            </label>
                        </div>
                    ))}
                </FieldGroup>
            </Field>

            <Field>
                <FieldLabel>How much time can you dedicate weekly?</FieldLabel>
                <Select
                    value={data.timeCommitment}
                    onValueChange={(value: string) => updateData('timeCommitment', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select time commitment" />
                    </SelectTrigger>
                    <SelectContent>
                        {timeOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onNext}>
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
    const statusOptions = [
        "Student",
        "Professional Developer",
        "Looking for Job",
        "Career Changer",
        "Hobbyist"
    ] as const

    const languages = [
        "Python",
        "JavaScript/TypeScript",
        "Java",
        "C++",
        "C#",
        "Go",
        "Rust",
        "Other"
    ] as const

    const handleAdditionalNotesChange = (value: string) => {
        updateData('additionalNotes', value)
    }

    return (
        <FieldSet>
            <FieldLegend>Almost There! 🚀</FieldLegend>
            <FieldDescription>
                Just a few more details to complete your profile
            </FieldDescription>
            <FieldSeparator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                    <FieldLabel>Current role</FieldLabel>
                    <Select
                        value={data.status}
                        onValueChange={(value: string) => updateData('status', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>{status}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </Field>

                <Field>
                    <FieldLabel>Primary programming language</FieldLabel>
                    <Select
                        value={data.programmingLanguages?.[0] || ""}
                        onValueChange={(value: string) => updateData('programmingLanguages', [value])}
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

            <Field>
                <FieldLabel>Anything else we should know? (Optional)</FieldLabel>
                <Textarea
                    placeholder="Specific goals, target companies, or learning preferences..."
                    className="min-h-[100px]"
                    value={data.additionalNotes || ""}
                    onChange={(e) => handleAdditionalNotesChange(e.target.value)}
                />
            </Field>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onBack}>
                    Back
                </Button>
                <Button onClick={onSubmit} className="px-8">
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

    const [formData, setFormData] = useState<OnboardingData>({
        goals: [],
        experienceLevel: "",
        interests: [],
        status: "",
        programmingLanguages: [],
        timeCommitment: "",
        preferredLearning: []
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

    const handleSubmit = () => {
        console.log("Form submitted:", formData)
        // Here you would typically send the data to your backend
        alert("Onboarding completed successfully!")
        navigate('/app/dashboard') // Redirect to dashboard
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
    )
}

export default OnboardPage