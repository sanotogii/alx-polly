"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, AlertCircle } from "lucide-react";
import type { Poll } from "@/lib/types";

interface PollDetailsProps {
  poll: Poll;
}

export function PollDetails({ poll }: PollDetailsProps) {
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
      // Submit votes via API
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
      
      // Update local poll data to reflect the vote
      // In a real app, this would be handled by re-fetching or state management
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

  const handleKeyDown = (event: React.KeyboardEvent, optionId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleOptionSelect(optionId);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold">{poll.title}</CardTitle>
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

      <Card>
        <CardHeader>
          <CardTitle>
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
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  !showResults && poll.isActive
                    ? isSelected
                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                      : "hover:border-gray-300 hover:shadow-sm"
                    : "cursor-default"
                }`}
                onClick={() => handleOptionSelect(option.id)}
                onKeyDown={(e) => handleKeyDown(e, option.id)}
                tabIndex={showResults ? -1 : 0}
                role="button"
                aria-pressed={isSelected}
                aria-label={`${option.text}${showResults ? ` - ${option.votes} votes (${percentage}%)` : ''}`}
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
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            >
              {isVoting ? "Submitting Vote..." : `Submit ${selectedOptions.length === 1 ? 'Vote' : `${selectedOptions.length} Votes`}`}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
