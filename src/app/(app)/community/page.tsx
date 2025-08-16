import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, PenSquare, Users } from 'lucide-react';
import Link from 'next/link';

const discussions = [
  {
    id: 1,
    title: 'Struggling with Algebra concepts',
    author: 'Alex Doe',
    avatar: 'https://github.com/shadcn.png',
    replies: 12,
    likes: 5,
    excerpt: 'Hey everyone, I\'m having a hard time understanding quadratic equations. Can anyone explain it in a simple way?',
    subject: 'Mathematics'
  },
  {
    id: 2,
    title: 'Tips for memorizing historical dates?',
    author: 'Jane Smith',
    avatar: 'https://github.com/shadcn.png',
    replies: 8,
    likes: 15,
    excerpt: 'I have a big history exam coming up and I\'m terrible at remembering dates. What are your best strategies?',
    subject: 'History'
  },
  {
    id: 3,
    title: 'What is the function of the mitochondria?',
    author: 'Sam Wilson',
    avatar: 'https://github.com/shadcn.png',
    replies: 20,
    likes: 10,
    excerpt: 'The textbook calls it the "powerhouse of the cell", but I need a more detailed explanation for my biology homework.',
    subject: 'Biology'
  }
];

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Users className="h-8 w-8" />
        <h1 className="text-3xl font-bold font-headline">Community Forum</h1>
      </div>
      <p className="text-muted-foreground max-w-3xl">
        Ask questions, share your knowledge, and connect with fellow learners.
      </p>

      <div className="flex justify-end">
        <Button asChild>
          <Link href="/community/new">
            <PenSquare className="mr-2 h-4 w-4" />
            Start a New Discussion
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {discussions.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={post.avatar} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Link href="#" className="hover:underline">
                    <CardTitle className="text-xl font-headline">{post.title}</CardTitle>
                  </Link>
                  <CardDescription>
                    Posted by {post.author} in <span className="text-primary font-medium">{post.subject}</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.replies} Replies</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes} Likes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
