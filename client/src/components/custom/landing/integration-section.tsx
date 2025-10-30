import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom';
import {SiCodechef, SiHackerrank, SiLeetcode, SiTopcoder} from 'react-icons/si'
import TufLogo from '@/components/logos/tuf-logo';
import CodeforcesLogo from '@/components/logos/codeforces-logo';

export default function IntegrationsSection() {
    return (
        <section>
            <div className="bg-background py-24 md:py-32">
                <div className="mx-auto flex flex-col px-6 md:grid md:max-w-5xl md:grid-cols-2 md:gap-12">
                    <div className="order-last mt-6 flex flex-col gap-12 md:order-first">
                        <div className="space-y-6">
                            <h2 className="text-balance text-3xl font-semibold md:text-4xl lg:text-5xl text-primary">
                                Connect & Track Instantly
                            </h2>
                            <p className="text-muted-foreground">
                                Link all your coding profiles from LeetCode, HackerRank, CodeChef, TopCoder, Codeforces, TUF, and more.<br />
                                Your achievements update automatically—no manual uploads.
                            </p>
                            <ul className="list-disc pl-6 text-muted-foreground text-base">
                                <li>Fast account linking: LeetCode, Codeforces, CodeChef, HackerRank, TUF, TopCoder</li>
                                <li>Automatic progress syncing and unified dashboard</li>
                                <li>Single profile to share with recruiters and peers</li>
                            </ul>
                            <Link to="/login">
                                <Button size="lg" className='cursor-pointer'>Get Started</Button>
                            </Link>
                        </div>
                    </div>


                    <div className="-mx-6 px-6 sm:mx-auto sm:max-w-md md:-mx-6 md:ml-auto md:mr-0">
                        <div className="bg-background dark:bg-muted/50 rounded-2xl border p-3 shadow-lg md:pb-12">
                            <div className="grid grid-cols-2 gap-2">
                                <Integration
                                    icon={<SiLeetcode size={28} color='orange' className='ml-6' />}
                                    name="LeetCode"
                                    description="LeetCode is the world's leading platform for coding interviews, technical assessments, and practice problems."
                                />
                                <Integration
                                    icon={<SiHackerrank size={28} color='green' className='ml-6' />}
                                    name="HackerRank"
                                    description="HackerRank is a widely used platform for coding practice, company challenges, and interactive interview prep."
                                />
                                <Integration
                                    icon={<TufLogo size={70} />}
                                    name="Take U Forward (TUF)"
                                    description="Take U Forward (TUF) offers structured DSA roadmaps, curated problem lists, and educational guides for coding interviews."
                                />
                                <Integration
                                    icon={<SiTopcoder size={35} className='ml-4 text-sky-800' />}
                                    name="TopCoder"
                                    description="TopCoder is a premier global community for competitive programming, algorithm contests, and coding marathons."
                                />
                                <Integration
                                    icon={<SiCodechef size={28} className='ml-6' color='#56341d' />}
                                    name="CodeChef"
                                    description="CodeChef is a leading Indian-based platform famous for monthly code contests, campus competitions, and coding resources."
                                />
                                <Integration
                                    icon={<CodeforcesLogo size={32} />}
                                    name="Codeforces"
                                    description="Codeforces is a top-rated competitive programming arena known for frequent contests, community-driven problem sets, and global rankings."
                                />

                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </section>
    )
}

const Integration = ({ icon, name, description }: { icon: React.ReactNode; name: string; description: string }) => {
    return (
        <div className="hover:bg-muted dark:hover:bg-muted/50 space-y-4 rounded-lg border p-4 transition-colors">
            <div className="flex size-fit items-center justify-center">{icon}</div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium">{name}</h3>
                <p className="text-muted-foreground line-clamp-1 text-sm md:line-clamp-2">{description}</p>
            </div>
        </div>
    )
}