"use client";
import React from 'react'
import { SignIn } from '@clerk/nextjs'

type Props = {}

const SignInPage = (props: Props) => {
  return (
    <SignIn routing='hash' />
  )
}

export default SignInPage

