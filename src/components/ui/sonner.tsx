"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export function Toaster(props: ToasterProps) {
  const { theme } = useTheme();
  const mode = theme === "porcelain" ? "light" : "dark";

  return (
    <Sonner
      theme={mode}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group glass-strong glass-edge !rounded-[var(--radius)] !border-border/70 !text-foreground !shadow-floaty",
          description: "!text-muted-foreground",
          actionButton: "!bg-primary !text-primary-foreground !rounded-md",
          cancelButton: "!bg-muted !text-muted-foreground !rounded-md"
        }
      }}
      style={{ fontFamily: "var(--font-body)" }}
      {...props}
    />
  );
}
