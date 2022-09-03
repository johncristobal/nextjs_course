import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "../../utils";

export async function middleware( req: NextRequest, ev: NextFetchEvent){
    
    try{
        await jwt.isValidToken(req.cookies.get('token') as string);
        console.log("Next");
        return NextResponse.next();
    }catch(error){
        console.log(error);
        return NextResponse.redirect(`/auth/login?p='checkout/address`)
    }
}