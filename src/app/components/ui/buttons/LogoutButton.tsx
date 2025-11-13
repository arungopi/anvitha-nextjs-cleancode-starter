/**
 * File: LogoutButton.tsx
 * Description: Logout button component renders button for logout fron client side
 * Author: Arun Gopi
 * Date: 2025-06-06
 * References : 
 *           
 */
"use client"
import { signOut } from "next-auth/react";

export default function LogoutButton(){
    return (<button onClick={()=>{signOut()}}>Logout</button>);
}