import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import githubIcon from '@/assets/github-icon.svg'
import Image from "next/image";

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input name="password_confirmation" type="password" id="password_confirmation" />
      </div>

   <Button type="submit" className="w-full">
    Create account
    </Button>

    <Button variant="link" className="w-full" size="sm" asChild>
      <Link href="/auth/sign-in">
    Already registered? Sign in
    </Link>
    </Button>
    
    <Separator />

    <Button type='submit' className="w-full" variant="outline">
      <Image src={githubIcon} className="size-4 mr-2 dark:invert" alt=""/>
      Sign up with GitHub
    </Button>
    </form>
  )
}