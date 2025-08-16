'use client';

import { useState, useEffect } from 'react';
import type { Question } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Award, RotateCw } from 'lucide-react';
import Link from 'next/link';

interface QuizComponentProps {
  quiz: Question[];
}

export default function QuizComponent({ quiz }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const currentQuestion = quiz[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  useEffect(() => {
    if (isFinished || showFeedback) return;

    if (timeLeft === 0) {
      setShowFeedback(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isFinished, showFeedback]);

  const handleAnswerSubmit = () => {
    setShowFeedback(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(15);
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(15);
  };
  
  if (isFinished) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
           <Award className="mx-auto h-16 w-16 text-primary" />
          <CardTitle className="text-3xl font-bold font-headline">Quiz Completed!</CardTitle>
          <CardDescription>Great job on finishing the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-4xl font-bold">
            Your Score: {score} / {quiz.length}
          </p>
          <Progress value={(score / quiz.length) * 100} className="w-full" />
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={restartQuiz}>
            <RotateCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/courses">Explore More Courses</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
           <CardTitle className="text-xl font-headline">Question {currentQuestionIndex + 1} of {quiz.length}</CardTitle>
           <div className="text-lg font-semibold">Time: {timeLeft}s</div>
        </div>
        <Progress value={((currentQuestionIndex + 1) / quiz.length) * 100} />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-medium">{currentQuestion.questionText}</p>
        <RadioGroup
          value={selectedAnswer ?? ''}
          onValueChange={setSelectedAnswer}
          disabled={showFeedback}
        >
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={cn(
                "flex items-center space-x-2 rounded-md border p-4 transition-all",
                showFeedback && option === currentQuestion.correctAnswer && "border-green-500 bg-green-500/10",
                showFeedback && option !== currentQuestion.correctAnswer && selectedAnswer === option && "border-red-500 bg-red-500/10",
              )}
            >
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`} className="flex-1 text-base cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {showFeedback && (
          <div
            className={cn(
              "flex items-start gap-4 rounded-lg p-4",
              isCorrect ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"
            )}
          >
            {isCorrect ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
            <div className="flex-1">
              <h3 className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect'}</h3>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!showFeedback ? (
          <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="w-full" variant="destructive">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="w-full">
            {currentQuestionIndex < quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
