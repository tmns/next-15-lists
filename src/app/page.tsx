import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <main className="space-y-6 text-center">
        <h1 className="text-4xl font-bold text-primary">Just Lists</h1>
        <p className="text-lg text-muted-foreground">
          That&apos;s it, nothing else.
        </p>
        <SignInButton mode="modal" fallbackRedirectUrl="/lists">
          <Button variant="outline">Get Started</Button>
        </SignInButton>
      </main>
    </div>
  );
}
