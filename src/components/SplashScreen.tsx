
import { Logo } from "./Logo";

export function SplashScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background animate-fade-out animation-delay-[2s]">
      <Logo />
    </div>
  );
}
