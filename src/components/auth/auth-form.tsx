"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Github, Loader2, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/brand/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_CREDENTIALS, markDemoAuthenticated, POST_LOGIN_ROUTE } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.66 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.9 1.5l2.7-2.6C17 .9 14.7 0 12 0 5.4 0 0 5.4 0 12s5.4 12 12 12c6.9 0 11.5-4.9 11.5-11.7 0-.8-.1-1.4-.2-2H12z"
      />
    </svg>
  );
}

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [email, setEmail] = React.useState(isLogin ? DEMO_CREDENTIALS.email : "");
  const [password, setPassword] = React.useState(isLogin ? DEMO_CREDENTIALS.password : "");
  const [name, setName] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function authenticate(method: string) {
    if (loading) return;
    setLoading(true);
    markDemoAuthenticated();
    toast.success(`${method} — entering workspace`, { description: "Loading the demo dashboard…" });
    window.setTimeout(() => router.push(POST_LOGIN_ROUTE), 750);
  }

  return (
    <div className="relative flex w-full items-center justify-center p-5 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        {/* mobile-only brand row */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <Logo subtitle={undefined} />
          <ThemeSwitcher />
        </div>

        <Card variant="gradient" className="p-7 shadow-floaty sm:p-8">
          <div className="mb-6 space-y-2">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {isLogin ? "Welcome back" : "Create your account"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isLogin
                ? "Use the floating demo card, or sign in below — it's pre-filled."
                : "Spin up a demo workspace. No real data leaves your browser."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => authenticate("Google")} disabled={loading}>
              <GoogleGlyph />
              Google
            </Button>
            <Button variant="outline" onClick={() => authenticate("GitHub")} disabled={loading}>
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </div>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              or with email
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              authenticate(isLogin ? "Signed in" : "Account created");
            }}
            className="space-y-4"
          >
            {!isLogin ? (
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-medium">
                  Full name
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Alex Rivera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            ) : null}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium">
                  Password
                </Label>
                {isLogin ? (
                  <span className="text-xs text-muted-foreground/70">forgot?</span>
                ) : null}
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="px-9"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:text-primary"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="gradient" size="lg" disabled={loading} className="w-full shine">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isLogin ? "Signing in…" : "Creating…"}
                </>
              ) : (
                <>
                  {isLogin ? "Sign in" : "Create account"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "New to HiredLens? " : "Already have an account? "}
            <Link
              href={isLogin ? "/signup" : "/login"}
              className={cn("font-semibold text-primary underline-offset-4 hover:underline")}
            >
              {isLogin ? "Create an account" : "Sign in"}
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
