"use client";

import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { LayoutVariants } from "@/components/ui/layout-variants";
import { PollDetails } from "@/components/polls/poll-details-variants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Palette, Layout, Eye } from "lucide-react";

// Mock poll data
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

export default function VersionsPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Design Versions</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Explore different design approaches and variations for your polling app
        </p>
      </div>

      <Tabs defaultValue="themes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Themes
          </TabsTrigger>
          <TabsTrigger value="layouts" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Layouts
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="themes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Variations</CardTitle>
              <CardDescription>
                Different color schemes and visual styles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemeSwitcher />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layouts" className="space-y-6">
          <LayoutVariants />
        </TabsContent>

        <TabsContent value="components" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Component Variants</CardTitle>
                <CardDescription>
                  Different styles for the poll details component
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Compact</Badge>
                    <Badge variant="outline">Colorful</Badge>
                    <Badge variant="outline">Minimal</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Switch between different component styles using the variant prop
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  Default variant in action
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PollDetails poll={mockPoll} variant="default" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎨 Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Light & Dark modes</li>
                  <li>• Colorful gradients</li>
                  <li>• Minimal design</li>
                  <li>• Custom color schemes</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📐 Layouts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Grid layout</li>
                  <li>• List layout</li>
                  <li>• Masonry layout</li>
                  <li>• Compact layout</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🧩 Components</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Default styling</li>
                  <li>• Compact version</li>
                  <li>• Colorful variant</li>
                  <li>• Minimal design</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>
                Implementation examples for each variation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Theme Switching:</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<ThemeSwitcher />`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Component Variants:</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<PollDetails poll={poll} variant="colorful" />`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Layout Variations:</h4>
                  <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {polls.map(poll => <PollCard key={poll.id} poll={poll} />)}
</div>`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
