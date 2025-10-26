import React from "react";
import { SignIn } from "@clerk/nextjs";
type Props = {};
export default function page({}: Props) {
    return (
        <div className="flex justify-center items-center h-screen">
            <SignIn />
        </div>
    )
}