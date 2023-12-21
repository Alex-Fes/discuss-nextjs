import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarContent,
    Input,
    Button,
    Avatar,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@nextui-org/react'
import Link from 'next/link'
import {auth} from "@/src/auth";
import * as actions from "@/src/actions";

export default async function Header() {
    const session = await auth() // use in server component

    let authContent: React.ReactNode
    if (session?.user) {
        authContent = (
            <Popover placement={'left'}>
                <PopoverTrigger>
                    <Avatar src={session.user.image || ''}/>
                </PopoverTrigger>
                <PopoverContent>
                    <div className={'p-4'}>
                        <form action={actions.signOut}>
                            <Button type={'submit'}>Sign Out</Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>
        )
    } else {
        authContent = (
            <>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button
                            type={'submit'}
                            color={'secondary'}
                            variant={'bordered'}>
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button
                            type={'submit'}
                            color={'primary'}
                            variant={'flat'}>
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        )
    }

    return (
        <Navbar className={'shadow mb-6'}>
            <NavbarBrand>
                <Link href={'/'} className={'font-bold'}>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify={'center'}>
                <NavbarItem>
                    <Input placeholder={'Search'}/>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify={'end'}>

                {authContent}

            </NavbarContent>
        </Navbar>
    )
}