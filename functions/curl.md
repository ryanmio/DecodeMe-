// This is a guide on how to use the curl command to interact with the getCodeSnippet function.
// The curl command is a tool to transfer data from or to a server, using one of the supported protocols (HTTP, HTTPS, FTP, etc.). 
// This command is used to make a POST request to the 'getCodeSnippet' function hosted on Firebase Functions.
//
// Here is a breakdown of the command:
//
// 'curl' - This initiates the curl command.
//
// '-m 70' - This sets the maximum time allowed for the transfer. In this case, it is set to 70 seconds.
//
// '-X POST' - This specifies the request method to be used when communicating with the HTTP server. In this case, it is a POST request.
//
// 'https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet' - This is the URL of the function to which the request is being made.
//
// '-H "Authorization: bearer $(gcloud auth print-identity-token)"' - This sets the request header for Authorization. It uses the identity token from gcloud for authentication.
//
// '-H "Content-Type: application/json"' - This sets the request header for Content-Type to application/json, indicating that the request body will be in JSON format.
//
// '-d '{}'' - This sends the specified data in the HTTP POST request. In this case, an empty JSON object is being sent.
//
// To use this command, replace the URL with the URL of your function, and ensure you have the correct identity token.
//
// Here is the command:
curl -m 70 -X POST https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet \
-H "Authorization: bearer $(gcloud auth print-identity-token)" \
-H "Content-Type: application/json" \
-d '{}'