import { Button } from '@nextui-org/react'
import * as actions from "@/src/actions";
// import {auth} from "@/src/auth";
import Profile from "@/src/components/profile";

export default async function Home() {
    // const session = await auth()

    return (
        <div>

            <form action={actions.signIn}>
                <Button type={'submit'}>Sign In</Button>
            </form>
            <form action={actions.signOut}>
                <Button type={'submit'}>Sign Out</Button>
            </form>

            <Profile/>
        </div>
    )
}
