import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PAGE_DESCRIPTION } from "@/lib/ui";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-6xl items-center px-4 py-12 md:px-8">
      <Card className="mx-auto w-full max-w-md shadow-depth transition-[box-shadow,transform] duration-500 ease-out motion-safe:hover:shadow-depth-lg">
        <CardHeader className="space-y-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/25 bg-gradient-to-br from-primary/15 to-primary/5 shadow-sm ring-1 ring-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1.5 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700">
            <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
            <CardDescription className={cn(PAGE_DESCRIPTION, "max-w-none")}>
              Sign in to continue your analysis. Full auth UI ships in a later milestone—this card is
              a polished placeholder.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button disabled className="w-full">
            Continue with Google
          </Button>
          <Button disabled variant="outline" className="w-full">
            Login with email
          </Button>
          <Button asChild variant="link" className="px-0">
            <Link href="/signup">Start for free</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
