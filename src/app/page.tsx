import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function LandingPage() {
  const user = await currentUser();

  const button = (() => {
    if (user) {
      return (
        <Button variant="outline" asChild>
          <Link href="/lists">Go To Lists</Link>
        </Button>
      );
    }

    return (
      <SignInButton mode="modal" fallbackRedirectUrl="/lists">
        <Button variant="outline">Get Started</Button>
      </SignInButton>
    );
  })();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <main className="space-y-6 text-center">
        <h1 className="text-4xl font-bold text-primary">Just Lists</h1>
        <p className="text-lg text-muted-foreground">
          That&apos;s it, nothing else.
        </p>
        {button}
      </main>
    </div>
  );
}
