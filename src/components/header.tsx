import {Input, Navbar, NavbarBrand, NavbarContent, NavbarItem,} from '@nextui-org/react'
import Link from 'next/link'
import HeaderAuth from "@/src/components/header-auth";

export default async function Header() {
   // const session = await auth() // use in server component, this makes the home page dynamic
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
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}