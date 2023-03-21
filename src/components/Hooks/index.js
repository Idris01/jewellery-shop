export async function makeHttp({url,body}){
	const hookData = {
		error:null,
		data:null
	}
	try{

		const response = body? await fetch(url, body) : await fetch(url);

		if (!response.ok){
			throw new Error(response.statusText)
		}
		const data = await response.json()
		hookData.data = data;

	}
	catch(error){
		hookData.error = error.message
	}

	return hookData
}