import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <main className="text-center space-y-6">
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
