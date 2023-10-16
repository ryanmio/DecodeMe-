curl -m 70 -X POST https://us-central1-decodeme-1f38e.cloudfunctions.net/getCodeSnippet \
-H "Authorization: bearer $(gcloud auth print-identity-token)" \
-H "Content-Type: application/json" \
-d '{}'