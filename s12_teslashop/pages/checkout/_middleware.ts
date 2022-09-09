import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware( req: NextRequest | any , ev: NextFetchEvent){
    
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
 
    const { origin } = req.nextUrl
    
    if (!session) {
        const requestedPage = req.page.name
        return NextResponse.redirect(`${origin}/auth/login?p=${requestedPage}`)
    }
    
    return NextResponse.next()

    // try{
    //     const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    //     if(!session){
    //         const requestedPage = req.page.name;
    //         return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
    //     }

    //     return NextResponse.next();
    // }catch(error){
    //     const requestedPage = req.page.name;
    //     return NextResponse.redirect(`/auth/login?p=${ requestedPage }`);
    // }
}