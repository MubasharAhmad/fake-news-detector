"use client";

import React, { ChangeEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [url, setUrl] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
    const [data, setData] = useState("");
	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setUrl(e.currentTarget.value);
		setError("");
	};
	const handleSubmit = async () => {
		try{
			await axios.get(url);
			setSuccess(true);
		}
		catch(err){
			try {
				const response = await axios.post("/api/get-page", {
					url,
				});
				setData(response.data.data);
				console.log(response.data.data);
				// Handle the response data
			} catch (error) {
				console.error("Error:", error);
				if(error instanceof Error){
					setError(error.message);
				}
				// Handle the error
			}
		}
	};
	const isValidUrl = (urlString: string) => {
		try {
			new URL(urlString);
			return true;
		} catch (e) {
			return false;
		}
	};
    
	console.log(success);
	return (
		<div className='container'>
			<div className='mb-12 mt-28 sm:mt-40 max-w-screen-xl flex flex-col gap-5 items-center justify-center text-center'>
				<Input
					type='url'
					placeholder='Enter URL'
					onChange={handleInputChange}
				/>
                <div className="flex flex-col sm:flex-row gap-5">
				<Button onClick={handleSubmit}>Check</Button>
                <Button onClick={handleSubmit}>Add to Vectorstore</Button>
				</div>
			</div>

			{url && isValidUrl(url) ? (
				<div
					className='flex flex-col items-center justify-center h-[300px] sm:h-[500px] w-full max-w-screen-xl mx-auto'
				>
					{success ? (
						<iframe
							className="border-2 rounded-md h-full w-full"
							src={url}
							frameBorder='0'
							allowFullScreen
						></iframe>
					) : (
						<div dangerouslySetInnerHTML={{ __html: data.replaceAll("<img", "<div").replaceAll("img/>", "div/>").replaceAll("<svg", "<div") }}/>
					)}
					{error && <p className="text-red-500">{error}</p>}
				</div>
			) : (
				url && !isValidUrl(url) && <p className="text-red-500">Please enter a valid URL.</p>
			)}
		</div>
	);
}
