import { auth, isAuthenticated } from "@/auth/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { acceptInvite } from "@/http/accept-invite"
import { getInvite } from "@/http/get-invite"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { CheckCircle, LogIn, LogOut } from "lucide-react"
import { cookies } from "next/headers"
import Link from "next/link"
import { redirect } from "next/navigation"


type ApplicationDetailsPageProps = {
  params: Promise<{id: string}>
}

dayjs.extend(relativeTime)

// Este é um componente Server que pode buscar dados diretamente
export default async function InvitePage({
  params,
}: ApplicationDetailsPageProps) {
  const { id } = await params
  const inviteId = id;
  // Buscar os dados do convite diretamente na renderização do servidor
  const { invite } = await getInvite(inviteId);
  const isUserAuthenticated = await isAuthenticated();

  let currentUserEmail = null;

  if (isUserAuthenticated) {
    const { user } = await auth();
    currentUserEmail = user.email;
  }

  const userIsAuthenticatedWithSameEmailFromInvite = currentUserEmail === invite.email;


async function signInFromInvite() {
  'use server'
  const cookieStore = await cookies()
  cookieStore.set('inviteId', inviteId)

  redirect(`/auth/sign-in?email=${invite.email}`)
}

async function acceptInviteAction() {
  'use server'

  await acceptInvite(inviteId)

  redirect('/')
}

return (
  <div className="flex min-h-screen flex-col items-center justify-center px-4">
    <div className="w-full max-w-sm space-y-6 flex flex-col justify-center">
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="size-16">
        {invite.author?.avatarUrl && (
          <AvatarImage src={invite.author.avatarUrl}/>
        )}
        <AvatarFallback />
      </Avatar>

      <p className="text-center leading-relaxed text-muted-foreground text-balance">
       <span className="font-medium text-foreground"> {invite.author?.name ?? 
      'Someone'}</span>{' '} invited you to join 
      <span className="font-medium text-foreground">{invite.organization.name} </span>.{' '}
      <span className="text-xs">{dayjs(invite.createdAt).fromNow()}</span>
      </p>
    </div>

    <Separator />

    {!isUserAuthenticated && (
      <form action={signInFromInvite}>
        <Button type="submit" variant="secondary" className="w-full">
          <LogIn className="size-4 mr-2"/>
          Sign in to accept the invite
        </Button>
      </form>
    )}

    {userIsAuthenticatedWithSameEmailFromInvite && (
        <form action={acceptInviteAction}>
        <Button type="submit" variant="secondary" className="w-full">
          <CheckCircle className="size-4 mr-2"/>
         Join {invite.organization.name}
        </Button>
      </form>
    )}

    {isUserAuthenticated && !userIsAuthenticatedWithSameEmailFromInvite && (
      <div className="space-y-4">
        <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
          This invite was sent to <span className="text-foreground font-medium">{invite.email} </span>
          but you are currently authenticated as 
          <span className="text-foreground font-medium">{currentUserEmail}</span>.
        </p>

        <div className="space-y-2">
          <Button className="w-full" variant='secondary' asChild>
            <a href="/api/auth/sign-out">
            <LogOut className="size-4 mr-2"/>
            Sign out from {currentUserEmail}
            </a>
          </Button>

          <Button className="w-full" variant='outline' asChild>
            <Link href="/" >
            Back to dashboard
            </Link>
          </Button>
        </div>
      </div>

    )}
    </div>
  </div>
)
}