"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PollData {
  option: string;
  votes: number;
}

const mockData: PollData[] = [
  { option: "React", votes: 120 },
  { option: "Vue", votes: 98 },
  { option: "Angular", votes: 65 },
  { option: "Svelte", votes: 42 },
  { option: "Other", votes: 23 },
];

interface PollResultChartProps {
  data?: PollData[];
}

export function PollResultChart({ data = mockData }: PollResultChartProps) {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="option" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            cursor={{ fill: "hsl(var(--primary) / 0.1)" }}
            contentStyle={{
              background: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
            }}
          />
          <Bar dataKey="votes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
