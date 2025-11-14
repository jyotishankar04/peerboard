import { motion } from "motion/react";

const style = {
    width: 30,
    height: 30,
    opacity: 1,
    margin: 5,
    borderRadius: 0,
    display: "inline-block",
    background: "#9453C9",
}

const variants = {
    start: {
        scale: 0.2,
        rotate: 0,
    },
    end: {
        scale: 1,
        rotate: 360,
    },
}

export default function Loader({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex items-center justify-center gap-10 flex-col w-full h-screen bg-background/20 backdrop-blur-lg" >
            <div>
                <motion.div
                    style={style}
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{
                        repeat: 11111,
                        repeatType: "reverse",
                        ease: "anticipate",
                        duration: 1,
                        delay: 0
                    }}
                />
                <motion.div
                    style={style}
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{
                        repeat: 11111,
                        repeatType: "reverse",
                        ease: "anticipate",
                        duration: 1,
                        delay: 0.2
                    }}
                />
                <motion.div
                    style={style}
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{
                        repeat: 11111,
                        repeatType: "reverse",
                        ease: "anticipate",
                        duration: 1,
                        delay: 0.4
                    }}
                />
                <motion.div
                    style={style}
                    variants={variants}
                    initial={"start"}
                    animate={"end"}
                    transition={{
                        repeat: 11111,
                        repeatType: "reverse",
                        ease: "anticipate",
                        duration: 1,
                        delay: 0.6
                    }}
                />
            </div>
            <p className="text-xl text-muted-foreground animate-pulse">{text}</p>
        </div>
    )
}