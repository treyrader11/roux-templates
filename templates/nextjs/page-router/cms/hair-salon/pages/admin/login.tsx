import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    const callbackUrl = (router.query.callbackUrl as string) || "/admin";
    router.push(callbackUrl);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-2xl text-foreground">
          Reverse Gen CMS
        </h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Sign in to manage your site content.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6"
        >
          <Field label="Email" error={errors.email?.message}>
            <Input type="email" {...register("email")} placeholder="admin@reversegen.salon" />
          </Field>
          <Field label="Password" error={errors.password?.message}>
            <Input type="password" {...register("password")} placeholder="••••••••" />
          </Field>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}
