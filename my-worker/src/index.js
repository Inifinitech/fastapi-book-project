/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener("fetch", (event) => {
	event.respondWith(handleRequest(event.request));
  });

  async function handleRequest(request) {
	const url = new URL(request.url);
	url.hostname = "fastapi-book-project-infinitech.onrender.com"; // Ensure this is correct

	// Clone request with updated URL
	const modifiedRequest = new Request(url, {
	  method: request.method,
	  headers: request.headers,
	  body: request.body, // Preserve body for POST requests
	  redirect: "follow",
	});

	let response = await fetch(modifiedRequest);

	// Ensure response body can be read
	let responseBody = await response.text();

	let newHeaders = new Headers(response.headers);
	newHeaders.set("Server", "nginx"); // Override "Server" header

	return new Response(responseBody, {
	  status: response.status,
	  statusText: response.statusText,
	  headers: newHeaders,
	});
  }



