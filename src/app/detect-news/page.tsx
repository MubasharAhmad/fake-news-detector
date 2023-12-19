"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const DetectNews = () => {
	const [news, setNewsTitle] = useState("");
	const [isTrue, setIsTrue] = useState(false);
	const [result, setResult] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// check if info is a url
    e.preventDefault();
		console.log(news);
		const res = await axios.post("/api/inference", {
			news,
		});
		console.log(res.data);
		const { result } = res.data;
		setResult(result);
		if (result.includes("true")) {
			setIsTrue(true);
		}
	};
	return (
		<div className='container mt-28 overflow-hidden'>
			<Card className='mx-2 sm:mx-auto'>
				<CardHeader>
					<CardTitle>Detect News</CardTitle>
					<CardDescription>Enter your news below to detect if its false or true.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className='grid w-full items-center gap-4'>
							<Textarea placeholder='Type your news here...' onChange={(e)=>{
                setNewsTitle(e.currentTarget.value);
              }} />
							<div className='flex justify-end'>
								<Button
									type='submit'
									className='w-32'
								>
									Detect
								</Button>
							</div>
						</div>
					</form>
					<div>
						{result ??
							(isTrue ? (
								<h1 className='text-green-500'>{result}</h1>
							) : (
								<h1 className='text-red-500'>{result}</h1>
							))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default DetectNews;
