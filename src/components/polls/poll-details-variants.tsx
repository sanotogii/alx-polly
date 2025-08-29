"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertCircle, Sparkles } from "lucide-react";
import type { Poll } from "@/lib/types";

interface PollDetailsProps {
  poll: Poll;
  variant?: 'default' | 'compact' | 'colorful' | 'minimal';
}

export function PollDetails({ poll, variant = 'default' }: PollDetailsProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(poll.hasVoted || false);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted || !poll.isActive) return;

    if (poll.allowMultipleVotes) {
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleVote = async () => {
    if (selectedOptions.length === 0) return;

    setIsVoting(true);
    try {
      const response = await fetch(`/api/polls/${poll.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optionIds: selectedOptions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      const result = await response.json();
      console.log("Vote submitted successfully:", result);

      selectedOptions.forEach(optionId => {
        const option = poll.options.find(opt => opt.id === optionId);
        if (option) {
          option.votes += 1;
          poll.totalVotes += 1;
        }
      });

      setHasVoted(true);
      setSelectedOptions([]);

    } catch (error) {
      console.error("Failed to submit vote:", error);
      setError("Failed to submit vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          card: "p-4",
          title: "text-xl",
          option: "p-3",
          button: "h-9"
        };
      case 'colorful':
        return {
          card: "border-2 border-gradient-to-r from-pink-500 to-purple-500 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950",
          title: "text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent",
          option: "p-4 border-2 hover:border-pink-300",
          button: "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
        };
      case 'minimal':
        return {
          card: "border-0 shadow-none bg-transparent",
          title: "text-2xl font-light",
          option: "p-4 border-l-4 border-l-gray-200 hover:border-l-primary",
          button: "border-2 border-current bg-transparent hover:bg-current hover:text-white"
        };
      default:
        return {
          card: "",
          title: "text-2xl font-semibold",
          option: "p-4",
          button: "w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="space-y-6">
      <Card className={styles.card}>
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <CardTitle className={styles.title}>{poll.title}</CardTitle>
              <CardDescription className="text-base">
                {poll.description}
              </CardDescription>
            </div>
            <Badge variant={poll.isActive ? "default" : "secondary"} className="shrink-0">
              {poll.isActive ? "Active" : "Closed"}
            </Badge>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={poll.createdBy.avatar} />
                <AvatarFallback>
                  {poll.createdBy.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">
                Created by {poll.createdBy.name}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {poll.totalVotes} total votes
            </div>
            <div className="text-sm text-muted-foreground">
              Created {formatDate(poll.createdAt)}
            </div>
          </div>
        </CardHeader>
      </Card>

      {hasVoted && (
        <Alert>
          <Check className="h-4 w-4" />
          <AlertDescription>
            Thank you for voting! Your vote has been recorded successfully.
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-auto p-0 text-destructive hover:text-destructive/80"
              onClick={() => setError(null)}
            >
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <Card className={styles.card}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {variant === 'colorful' && <Sparkles className="h-5 w-5 text-pink-500" />}
            {hasVoted || !poll.isActive ? "Results" : "Cast Your Vote"}
          </CardTitle>
          {!hasVoted && poll.isActive && poll.allowMultipleVotes && (
            <CardDescription>
              You can select multiple options
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {poll.options.map((option) => {
            const percentage = getPercentage(option.votes);
            const isSelected = selectedOptions.includes(option.id);
            const showResults = hasVoted || !poll.isActive;

            return (
              <div
                key={option.id}
                className={`${styles.option} border rounded-lg cursor-pointer transition-all duration-200 ${
                  !showResults && poll.isActive
                    ? isSelected
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                      : "hover:border-gray-300 hover:shadow-sm"
                    : "cursor-default"
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{option.text}</span>
                  {showResults && (
                    <span className="text-sm text-muted-foreground">
                      {option.votes} votes ({percentage}%)
                    </span>
                  )}
                </div>

                {showResults && (
                  <Progress value={percentage} className="h-2 transition-all duration-1000 ease-out" />
                )}
              </div>
            );
          })}

          {!hasVoted && poll.isActive && selectedOptions.length > 0 && (
            <Button
              onClick={handleVote}
              disabled={isVoting}
              className={`${styles.button} ${variant === 'minimal' ? 'text-primary' : ''}`}
            >
              {isVoting ? "Submitting Vote..." : `Submit ${selectedOptions.length === 1 ? 'Vote' : `${selectedOptions.length} Votes`}`}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
