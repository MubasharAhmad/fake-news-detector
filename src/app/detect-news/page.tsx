"use client"
import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const DetectNews = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  return (
    <div className="container mt-28 overflow-hidden">
      <Card className="mx-2 sm:mx-auto">
        <CardHeader>
          <CardTitle>Detect News</CardTitle>
          <CardDescription>Enter your news below to detect if its false or true.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <Textarea placeholder="Type your news here..." />
              <div className='flex justify-end'>
                <Button type='submit' className='w-32'>Detect</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default DetectNews
