
'use client';

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button";
import { ArrowRight, BookOpen, Target, TrendingUp, Bot } from "lucide-react";
import Image from "next/image";

const features = [
  {
    Icon: BookOpen,
    title: 'Structured Notes',
    description: 'Access well-organized course notes by subject and topic, tailored for effective learning.',
    cta: 'Browse Courses',
    link: '/signup',
    image: '/images/feature-notes.png',
    dataAiHint: 'notebooks books',
  },
  {
    Icon: Target,
    title: 'Interactive Quizzes',
    description: 'Test your knowledge with engaging, timer-based assessments and solidify your understanding.',
    cta: 'Take a Quiz',
    link: '/signup',
    image: '/images/feature-quiz.png',
    dataAiHint: 'quiz test',
  },
  {
    Icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Visualize your learning journey with insightful analytics and stay motivated.',
    cta: 'View Dashboard',
    link: '/signup',
    image: '/images/feature-progress.png',
    dataAiHint: 'charts graphs',
  },
  {
    Icon: Bot,
    title: 'AI Revision',
    description: 'Get personalized revision prompts from our AI to focus on your specific weak areas.',
    cta: 'Get Prompts',
    link: '/signup',
    image: '/images/feature-ai.png',
    dataAiHint: 'robot thinking',
  },
];


export default function FeatureCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{ loop: true }}
    >
      <CarouselContent>
        {features.map((feature, index) => {
          const Icon = feature.Icon;
          return (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="overflow-hidden">
                  <div className="grid md:grid-cols-2">
                      <div className="p-8 md:p-12 flex flex-col justify-center items-start">
                           <Icon className="h-10 w-10 text-primary" />
                          <h3 className="text-2xl md:text-3xl font-bold font-headline mt-4">{feature.title}</h3>
                          <p className="text-muted-foreground mt-2 text-base md:text-lg">{feature.description}</p>
                          <Button asChild className="mt-6 group" size="lg">
                              <Link href={feature.link}>
                                  {feature.cta}
                                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </Link>
                          </Button>
                      </div>
                       <div className="relative h-64 md:h-auto">
                          <Image 
                              src={feature.image}
                              alt={feature.title}
                              fill
                              className="object-cover"
                              data-ai-hint={feature.dataAiHint}
                          />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r"></div>
                      </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  )
}
