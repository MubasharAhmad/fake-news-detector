"use client";

import React, { ChangeEventHandler, useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import CsvProcessor from "@/components/CsvProcessor";

export default function Home() {
	const [news, setNewsTitle] = useState("");
	const [url, setUrl] = useState("");
	const [valid, setIsNewsValid] = useState(false);
	const [success, setSuccess] = useState(false);
	const [isTrue, setIsTrue] = useState(false);
	const [error, setError] = useState("");
	const [data, setData] = useState("");
	const [result, setResult] = useState("");
	const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setUrl(e.currentTarget.value);
		setError("");
	};

	const handleInputTextChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setNewsTitle(e.currentTarget.value);
		setError("");
	};

	const handleCheck = async () => {
		// check if info is a url
		console.log(news);
		const res = await axios.post("/api/inference", {
			url,
			news,
			valid,
		});
		console.log(res.data);
		const { result } = res.data;
		setResult(result);
		if (result.includes("true")) {
			setIsTrue(true);
		}

	};
	console.log(result);
	const handleAddToVectorStore = async () => {
		try {
			const res = await axios.post("/api/add-to-vectorstore", {
				url,
				news,
				valid,
			});
			console.log(res.data);
		} catch (err) {
			try {
				const response = await axios.post("/api/get-page", {
					url,
				});
				setData(response.data.data);
				console.log(response.data.data);
				// Handle the response data
			} catch (error) {
				console.error("Error:", error);
				if (error instanceof Error) {
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

	const handleCheckboxChange = () => {
		setIsNewsValid(!valid);
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
				<Input
					type='text'
					placeholder='Enter Text'
					onChange={handleInputTextChange}
				/>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='isNewsValid'
						checked={valid}
						onChange={handleCheckboxChange}
					/>
					<label
						htmlFor='isNewsValid'
						className='ml-2'
					>
						Is News Valid
					</label>
				</div>
				<div className='flex flex-col sm:flex-row gap-5'>
					<Button onClick={handleCheck}>Check</Button>
					<Button onClick={handleAddToVectorStore}>Add to Vectorstore</Button>
				</div>
				<div>
					{result ??
						(isTrue ? (
							<h1 className='text-green-500'>{result}</h1>
						) : (
							<h1 className='text-red-500'>{result}</h1>
						))}
				</div>
				<CsvProcessor />
			</div>

			{url && isValidUrl(url) && (
				<div className='flex flex-col items-center justify-center h-[300px] sm:h-[500px] w-full max-w-screen-xl mx-auto'>
					{success ? (
						<iframe
							className='border-2 rounded-md h-full w-full'
							src={url}
							frameBorder='0'
							allowFullScreen
						></iframe>
					) : (
						<div
							dangerouslySetInnerHTML={{
								__html: data
									.replaceAll("<img", "<div")
									.replaceAll("img/>", "div/>")
									.replaceAll("<svg", "<div"),
							}}
						/>
					)}
					{error && <p className='text-red-500'>{error}</p>}
				</div>
			)}
		</div>
	);
}
