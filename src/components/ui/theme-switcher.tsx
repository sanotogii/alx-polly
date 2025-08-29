"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sun, Moon, Palette, Sparkles } from "lucide-react";

const themes = [
  {
    id: 'light',
    name: 'Light',
    icon: Sun,
    description: 'Clean, bright interface',
    colors: 'bg-white text-gray-900'
  },
  {
    id: 'dark',
    name: 'Dark',
    icon: Moon,
    description: 'Easy on the eyes',
    colors: 'bg-gray-900 text-white'
  },
  {
    id: 'colorful',
    name: 'Colorful',
    icon: Sparkles,
    description: 'Vibrant and fun',
    colors: 'bg-gradient-to-br from-pink-100 to-purple-100 text-gray-900'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    icon: Palette,
    description: 'Clean and simple',
    colors: 'bg-gray-50 text-gray-800'
  }
] as const;

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<typeof themes[number]['id']>('light');

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    root.className = currentTheme === 'dark' ? 'dark' : '';

    if (currentTheme === 'colorful') {
      root.style.setProperty('--primary', '#ec4899');
      root.style.setProperty('--primary-foreground', '#ffffff');
    } else {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-foreground');
    }
  }, [currentTheme]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Switcher
        </CardTitle>
        <CardDescription>
          Choose your preferred visual theme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((theme) => {
            const Icon = theme.icon;
            return (
              <Button
                key={theme.id}
                variant={currentTheme === theme.id ? "default" : "outline"}
                onClick={() => setCurrentTheme(theme.id)}
                className="h-auto p-4 flex flex-col items-center gap-2"
              >
                <Icon className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">{theme.name}</div>
                  <div className="text-xs opacity-70">{theme.description}</div>
                </div>
                {currentTheme === theme.id && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Theme:</span>
            <Badge variant="outline">
              {themes.find(t => t.id === currentTheme)?.name}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
