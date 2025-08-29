"use client";

import { useState } from "react";
import { PollDetails } from "@/components/polls/poll-details-variants";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock poll data for demonstration
const mockPoll = {
  id: "demo",
  title: "What's your favorite programming language?",
  description: "Choose your preferred programming language for web development",
  options: [
    { id: "1", text: "JavaScript", votes: 45 },
    { id: "2", text: "Python", votes: 38 },
    { id: "3", text: "TypeScript", votes: 32 },
    { id: "4", text: "Go", votes: 18 },
    { id: "5", text: "Rust", votes: 9 },
  ],
  totalVotes: 142,
  createdAt: new Date("2024-01-15"),
  endsAt: new Date("2024-02-15"),
  isActive: true,
  allowMultipleVotes: false,
  createdBy: {
    id: "user1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date("2023-01-01"),
  },
};

const variants = [
  { id: 'default', name: 'Default', description: 'Clean and professional design' },
  { id: 'compact', name: 'Compact', description: 'Space-efficient layout' },
  { id: 'colorful', name: 'Colorful', description: 'Vibrant gradient design' },
  { id: 'minimal', name: 'Minimal', description: 'Clean, borderless design' },
] as const;

export default function VariantsDemoPage() {
  const [selectedVariant, setSelectedVariant] = useState<typeof variants[number]['id']>('default');

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Poll Design Variants</h1>
        <p className="text-muted-foreground text-lg mb-6">
          Explore different design styles for the poll component
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {variants.map((variant) => (
            <Button
              key={variant.id}
              variant={selectedVariant === variant.id ? "default" : "outline"}
              onClick={() => setSelectedVariant(variant.id)}
              className="flex items-center gap-2"
            >
              <Badge variant={selectedVariant === variant.id ? "default" : "secondary"}>
                {variant.name}
              </Badge>
              <span className="hidden sm:inline">{variant.description}</span>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Variant: {variants.find(v => v.id === selectedVariant)?.name}</CardTitle>
            <CardDescription>
              {variants.find(v => v.id === selectedVariant)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground space-y-2">
              <p><strong>Features:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {selectedVariant === 'default' && (
                  <>
                    <li>Professional gradient buttons</li>
                    <li>Smooth hover animations</li>
                    <li>Clear visual hierarchy</li>
                    <li>Accessible design</li>
                  </>
                )}
                {selectedVariant === 'compact' && (
                  <>
                    <li>Reduced padding and spacing</li>
                    <li>Smaller buttons and text</li>
                    <li>Space-efficient layout</li>
                    <li>Perfect for mobile</li>
                  </>
                )}
                {selectedVariant === 'colorful' && (
                  <>
                    <li>Vibrant gradient backgrounds</li>
                    <li>Pink to purple color scheme</li>
                    <li>Sparkle icons for fun</li>
                    <li>Eye-catching design</li>
                  </>
                )}
                {selectedVariant === 'minimal' && (
                  <>
                    <li>No borders or shadows</li>
                    <li>Transparent backgrounds</li>
                    <li>Left border accents</li>
                    <li>Clean, modern look</li>
                  </>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Preview</h2>
          <PollDetails poll={mockPoll} variant={selectedVariant} />
        </div>
      </div>

      <div className="mt-12 pt-8 border-t">
        <h2 className="text-2xl font-semibold mb-4">Usage</h2>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="text-sm overflow-x-auto">
{`<PollDetails
  poll={pollData}
  variant="${selectedVariant}"
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
