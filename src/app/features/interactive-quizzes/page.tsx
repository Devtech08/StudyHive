
'use client';

import { useState, useEffect } from 'react';
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import Link from "next/link";
import { CheckCircle, HelpCircle, Target, Zap, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

const exampleQuestions = [
    {
        id: 'q1',
        questionText: "What is the powerhouse of the cell?",
        options: [
            { id: 'a', text: 'Nucleus' },
            { id: 'b', text: 'Mitochondria' },
            { id: 'c', text: 'Ribosome' },
        ],
        correctAnswer: 'b',
        explanation: 'Correct! The mitochondria is the powerhouse of the cell.'
    },
    {
        id: 'q2',
        questionText: "Which planet is known as the Red Planet?",
        options: [
            { id: 'a', text: 'Earth' },
            { id: 'b', text: 'Mars' },
            { id: 'c', text: 'Jupiter' },
        ],
        correctAnswer: 'b',
        explanation: 'Correct! Mars is often called the Red Planet due to its reddish appearance.'
    },
    {
        id: 'q3',
        questionText: "What is the capital of Japan?",
        options: [
            { id: 'a', text: 'Beijing' },
            { id: 'b', text: 'Seoul' },
            { id: 'c', text: 'Tokyo' },
        ],
        correctAnswer: 'c',
        explanation: 'Correct! Tokyo is the capital city of Japan.'
    }
];

export default function InteractiveQuizzesPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect'; message: string } | null>(null);
    
    const currentQuestion = exampleQuestions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % exampleQuestions.length);
            setSelectedAnswer(null);
            setFeedback(null);
        }, 60000); // Change question every 60 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);


    const handleSubmit = () => {
        if (!selectedAnswer) {
            setFeedback({ type: 'incorrect', message: 'Please select an answer.' });
            return;
        }

        if (selectedAnswer === correctAnswer) {
            setFeedback({ type: 'correct', message: currentQuestion.explanation });
        } else {
            const correctOption = currentQuestion.options.find(opt => opt.id === correctAnswer);
            setFeedback({ type: 'incorrect', message: `Not quite. The correct answer is ${correctOption?.text}.` });
        }
    };

    const handleValueChange = (value: string) => {
        setSelectedAnswer(value);
        setFeedback(null); // Reset feedback when a new option is selected
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
                <Logo />
                <UserNav />
            </header>
            <main className="flex-1">
                <section className="relative w-full py-20 md:py-32 lg:py-40 flex items-center justify-center text-center">
                    <Image
                        src="https://media.istockphoto.com/id/2221305528/photo/did-you-know-question-mark.jpg?s=2048x2048&w=is&k=20&c=AP0JfiWSwwTeLGOxpJWMhncvMul1RP2SlXIn_70X508="
                        alt="Question mark background"
                        fill
                        className="object-cover -z-10"
                        data-ai-hint="question mark"
                    />
                    <div className="absolute inset-0 bg-black/70 -z-10" />
                    <div className="container px-4 md:px-6 text-white">
                        <div className="space-y-4 max-w-3xl mx-auto">
                            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Feature Highlight</div>
                            <h1 className="text-4xl font-bold font-headline tracking-tighter sm:text-5xl md:text-6xl">
                                Solidify Your Knowledge with Interactive Quizzes
                            </h1>
                            <p className="text-lg text-white/80">
                                Move beyond passive reading. Our engaging, AI-powered quizzes help you actively recall information, identify weak spots, and learn faster.
                            </p>
                            <Button asChild size="lg">
                                <Link href="/ai-revision">
                                    Try an AI-Generated Quiz
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
                    <div className="container px-4 md:px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                             <div className="p-4">
                                <Card className="shadow-2xl">
                                    <CardHeader>
                                        <CardTitle>Example Question</CardTitle>
                                        <CardDescription>{currentQuestion.questionText}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup 
                                            value={selectedAnswer || ''}
                                            onValueChange={handleValueChange}
                                            className="space-y-2"
                                        >
                                            {currentQuestion.options.map(option => (
                                                <Label key={option.id} htmlFor={`${currentQuestion.id}-${option.id}`} className={cn(
                                                    "flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer",
                                                    "has-[:checked]:border-primary has-[:checked]:bg-primary/5",
                                                    feedback && selectedAnswer === option.id && feedback.type === 'incorrect' && "border-destructive bg-destructive/5 text-destructive has-[:checked]:border-destructive",
                                                    feedback && option.id === correctAnswer && feedback.type === 'correct' && "border-green-500 bg-green-500/5 text-green-600 has-[:checked]:border-green-500"
                                                )}>
                                                    <RadioGroupItem value={option.id} id={`${currentQuestion.id}-${option.id}`} />
                                                    <span>{option.text}</span>
                                                </Label>
                                            ))}
                                        </RadioGroup>
                                    </CardContent>
                                    <CardFooter className="flex-col items-start">
                                        <Button onClick={handleSubmit} className="w-full">Submit Answer</Button>
                                        {feedback && (
                                            <div className={cn(
                                                "mt-4 flex items-center p-3 rounded-lg w-full text-sm",
                                                feedback.type === 'correct' ? 'bg-green-100/80 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-destructive/10 text-destructive'
                                            )}>
                                                {feedback.type === 'correct' ? 
                                                    <CheckCircle className="w-5 h-5 mr-2" /> : 
                                                    <XCircle className="w-5 h-5 mr-2" />}
                                                {feedback.message}
                                            </div>
                                        )}
                                    </CardFooter>
                                </Card>
                            </div>
                            <div className="space-y-6 text-center md:text-left">
                                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl">Active Recall for Better Retention</h2>
                                <p className="text-muted-foreground text-lg">
                                    Testing yourself is one of the most effective ways to study. StudyHive's quizzes are designed to make this process seamless and effective.
                                </p>
                                <ul className="space-y-4 text-lg">
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><CheckCircle className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Instant Feedback</h4>
                                            <p className="text-sm text-muted-foreground">Know immediately what you got right and wrong, with explanations to clarify concepts.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><Zap className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">Gamified Challenges</h4>
                                            <p className="text-sm text-muted-foreground">Engage in timed quizzes, earn points, and climb the leaderboard for a fun, motivating experience.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="p-2 rounded-full bg-primary/10 mt-1"><Target className="w-6 h-6 text-primary" /></div>
                                        <div>
                                            <h4 className="font-semibold">AI-Powered Personalization</h4>
                                            <p className="text-sm text-muted-foreground">Our AI can generate mock exams or quick challenges tailored to your specific course and weak topics.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
