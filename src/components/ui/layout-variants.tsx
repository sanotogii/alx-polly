"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PollCard } from "@/components/polls/poll-card";
import { Grid, List, LayoutGrid, Columns } from "lucide-react";

// Mock data
const mockPolls = [
  {
    id: "1",
    title: "What's your favorite programming language?",
    description: "Choose your preferred programming language for web development",
    totalVotes: 142,
    createdAt: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: "2",
    title: "Best frontend framework for 2024?",
    description: "Which frontend framework do you think will dominate in 2024?",
    totalVotes: 186,
    createdAt: new Date("2024-01-10"),
    isActive: true,
  },
  {
    id: "3",
    title: "Remote work preferences",
    description: "How do you prefer to work?",
    totalVotes: 147,
    createdAt: new Date("2023-12-20"),
    isActive: false,
  },
];

const layouts = [
  {
    id: 'grid',
    name: 'Grid',
    icon: Grid,
    description: 'Classic card grid layout',
    gridClass: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3'
  },
  {
    id: 'list',
    name: 'List',
    icon: List,
    description: 'Vertical list layout',
    gridClass: 'flex flex-col gap-4 max-w-2xl'
  },
  {
    id: 'masonry',
    name: 'Masonry',
    icon: LayoutGrid,
    description: 'Pinterest-style layout',
    gridClass: 'columns-1 md:columns-2 lg:columns-3 gap-6'
  },
  {
    id: 'compact',
    name: 'Compact',
    icon: Columns,
    description: 'Space-efficient layout',
    gridClass: 'grid gap-3 md:grid-cols-2 lg:grid-cols-4'
  }
] as const;

export function LayoutVariants() {
  const [currentLayout, setCurrentLayout] = useState<typeof layouts[number]['id']>('grid');

  const currentLayoutConfig = layouts.find(l => l.id === currentLayout);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Layout Variants</CardTitle>
          <CardDescription>
            Different ways to display poll cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3 mb-6">
            {layouts.map((layout) => {
              const Icon = layout.icon;
              return (
                <Button
                  key={layout.id}
                  variant={currentLayout === layout.id ? "default" : "outline"}
                  onClick={() => setCurrentLayout(layout.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {layout.name}
                </Button>
              );
            })}
          </div>

          <div className="text-sm text-muted-foreground">
            <strong>Current:</strong> {currentLayoutConfig?.description}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Preview</h3>
          <Badge variant="outline">
            {currentLayoutConfig?.name} Layout
          </Badge>
        </div>

        <div className={currentLayoutConfig?.gridClass}>
          {mockPolls.map((poll) => (
            <div key={poll.id} className={currentLayout === 'masonry' ? 'break-inside-avoid mb-6' : ''}>
              <PollCard poll={poll} />
            </div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
{`<div className="${currentLayoutConfig?.gridClass}">
  {polls.map((poll) => (
    <PollCard key={poll.id} poll={poll} />
  ))}
</div>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
