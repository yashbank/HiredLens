import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";
import { AuthForm } from "@/components/auth/auth-form";
import { DemoCredentials } from "@/components/auth/demo-credentials";

export default function SignupPage() {
  return (
    <main className="relative grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      <AuthBrandPanel />
      <div className="flex min-h-dvh items-center justify-center">
        <AuthForm mode="signup" />
      </div>
      <DemoCredentials />
    </main>
  );
}
