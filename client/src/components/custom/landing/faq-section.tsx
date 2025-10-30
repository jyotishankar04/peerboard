"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link } from "react-router-dom"

export default function FAQsSection() {
    const faqItems = [
        {
            id: "item-1",
            question: "Is my data private?",
            answer:
                "Yes, your data privacy is our top priority. We use industry-standard encryption to protect all your personal information and coding profiles. Your data is never shared with third parties without your explicit consent. You have full control over your privacy settings and can choose which information is visible on your public profile.",
        },
        {
            id: "item-2",
            question: "How do teams work?",
            answer:
                "Teams allow you to collaborate with other coders and compete together on leaderboards. You can create a team, invite members, and track collective progress across all members. Teams have their own leaderboards where you can see how your team ranks against others. Team leaders can manage members and customize team settings.",
        },
        {
            id: "item-3",
            question: "Can I join without linking all accounts?",
            answer:
                "You can start with just one coding platform account (LeetCode, CodeChef, Codeforces, etc.) and link additional accounts later. Our platform works with partial account linking, so you can gradually connect more profiles as you wish. Your progress will be aggregated from all linked accounts.",
        },
        {
            id: "item-4",
            question: "How often is progress updated?",
            answer:
                "Progress updates happen in real-time for most platforms. We sync your coding profiles every few minutes to ensure your leaderboard rankings and statistics are always current. You can manually refresh your profile anytime to get the latest data immediately.",
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground mt-4 text-balance">
                        Find answers to common questions about privacy, teams, account linking, and data updates.
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion type="single" collapsible className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1">
                        {faqItems.map((item) => (
                            <div className="group" key={item.id}>
                                <AccordionItem
                                    value={item.id}
                                    className="data-[state=open]:bg-card cursor-pointer dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                                >
                                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                            </div>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        Can't find what you're looking for? Contact our{" "}
                        <Link to="#" className="text-primary font-medium hover:underline">
                            support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}