import Image from "next/image";
import Link from "next/link";
import DemoLogin from "@/components/form/demo-login";
import GoogleLoginButton from "@/components/form/google-login";
import LoginForm from "@/components/form/login-form";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            SprintFlow
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
            <div className="mt-4 flex justify-center"><GoogleLoginButton /></div>
            <DemoLogin />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login.png"
          alt="SprintFlow"
          fill
          className="object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
