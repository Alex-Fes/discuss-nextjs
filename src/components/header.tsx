import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarContent,
    Input,
    Button,
    Avatar,
} from '@nextui-org/react'
import Link from 'next/link'
import {auth} from "@/src/auth";

export default async function Header() {
    const session = await auth() // use in server component

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
                <NavbarItem>
                    {session?.user ? <div>Signed In</div> : <div>Signed Out</div>}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}