// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed


const CODE_SEC_CHECKER = `// Role
You are a senior security engineer auditing the provided code.

// Focus Areas
Input validation/encoding; authn/authz; secrets; crypto; data protection; dependencies/CVEs; errors/logging; concurrency; filesystem/path traversal; SSRF/CSRF/CORS/clickjacking; deserialization/prototype pollution; command/shell injection; template injection; DoS/rate limiting; supply chain.

// Output (strict format with headers, bold, tables, code)
1) Executive Summary (5–6 sentences; highlight top risks and blast radius)
2) Detailed Findings 
   - For each finding:
     - Name + Severity (Critical/High/Medium/Low, justify)
     - Risk/Exploit Narrative (attack surface, impact)
     - Example Payload/Flow (request → handler → sink)
     - Precise Fix + secure code snippet (language/framework-appropriate)
     - Defensive Controls with CWE/OWASP references (IDs + titles)
3) Prioritized Remediation Checklist
   - Table: Priority (P0/P1/P2) | Task | Owner | Effort (S/M/L) | Dependencies
   - 5–8 bullets sequencing quick wins → systemic hardening
4) Refactored Secure Code for Critical Fixes
   - Production-ready snippets with comments (prepared statements, safe deserialization, allowlists, headers)
5) Highlight the necessarty terms in the response

// Style
Be precise, technical, and concise. Use least-privilege, deny-by-default. Explicitly call out unsafe defaults. No follow-up questions or CTAs.

// Input
Analyze this code:
`

const OWASP_CHECKER = `You are an OWASP-focused AppSec reviewer. Analyze the code strictly against OWASP Top 10 (latest edition). For each relevant category (A01–A10), identify specific code-level issues, explain exploitability and impact, show an example attack payload/flow, provide precise fixes with secure code snippets, and reference CWE/OWASP items.

Cover:
- A01: Broken Access Control (authz checks, IDOR, privilege escalation)
- A02: Cryptographic Failures (secrets, TLS, hashing/salting, randomness)
- A03: Injection (SQL/NoSQL/LDAP/OS/command, template injection)
- A04: Insecure Design (trust boundaries, threat model gaps)
- A05: Security Misconfiguration (headers, CORS, default creds, verbose errors)
- A06: Vulnerable & Outdated Components (versions, CVEs, SBOM hints)
- A07: Identification & Authentication Failures (session management, MFA, resets)
- A08: Software & Data Integrity Failures (supply chain, deserialization)
- A09: Security Logging & Monitoring Failures (coverage, sensitive leakage)
- A10: Server-Side Request Forgery (SSRF) and related network egress controls

Return:
1) Executive summary
2) Findings per OWASP category with severity (Critical/High/Medium/Low)
3) Prioritized remediation checklist
4) Secure, refactored code for critical fixes
5) Highlight the necessarty terms in the response

Code to review:
`

function isMarkdownPart(part){ 
	// markdown parts have the value.value as string - exploit it to findout teh markdwn part of teh sub responses in teh assistanrt response
	if (part && part.value && part.value.value === "string"){
		return true
	}
	else{
		return false
	}
}

function getMarkdownParts(chatResponsePart){
	// get me markdown part of teh chat response turn - from the assistant
	let markdownText = chatResponsePart.filter(
		(part) => {
			return isMarkdownPart(part)
		}
	).map(
		part => {
			return part.value.value
		}
	).join("")
	return markdownText
}

function activate(context){
	
	// get me teh context of the current editor if the current editor is open !
	// const activeEditor = vscode.
	const handler = async (request, context, stream, token) => {
		let activeEditor = vscode.window.activeTextEditor;
		let referencedFiles = request.references
		let fileText = ""
		let refereceFileContent = ""

		if (request.references && request.references.length > 0){
			for (const reference of referencedFiles){
				// open the document and get the text from the document 
				try{
					if (reference.value.path){
						let fileUri = vscode.Uri.file(reference.value.path)
						const doc = await vscode.workspace.openTextDocument(fileUri)
						const content = doc.getText()
						if(content){
							// Debugging
							// stream.markdown(`Sucessfully read file : ${fileUri}\n`)
						}
						// Debugging
						// stream.markdown(`Reference URI : ${typeof reference.uri} ${typeof referencedFiles}, ${Object.entries(referencedFiles), Object.keys(referencedFiles)}`)
						refereceFileContent += `\n\n### File: ${reference.value.path}\n${content}`;
					}
				}
				catch(err){
					// Debugging
					// stream.markdown(`Could not read file: ${reference.value._fsPath}\n\n`)
					continue
				}
			}
		}
		if(activeEditor && (!refereceFileContent)){
			const document = activeEditor.document;
			const filePath = document.uri.fsPath;
			fileText = document.getText();
			console.log(`File path ${filePath}, and file text ${fileText}`)
		}

		let prompt = CODE_SEC_CHECKER
		if (request.command === "owasp"){
			prompt = OWASP_CHECKER
		}

		const messages = [
			vscode.LanguageModelChatMessage.User(prompt)
		]
		if (refereceFileContent){
			messages.push(vscode.LanguageModelChatMessage.User(refereceFileContent))
		}
		if(activeEditor){
			messages.push(vscode.LanguageModelChatMessage.User("\n Current file code block : " + fileText))
		}
		
		// stream.markdown(context.history)

		/* ----- History into context : 
		if (context.history){
			let previousMessages = context.history.filter(
				(chat) => {
					return chat instanceof vscode.ChatResponseTurn
				}
			)
 
			// previousMessages.forEach((message) => {
			// 	messages.push(
			// 		vscode.LanguageModelChatMessage.Assistant(message)
			// 	)
			// })

			// Chat response can have something like other than just text
			// - imaage + text + file - we onlt need the text from the above
			// stream.markdown(previousMessages)
			previousMessages.forEach((message) => {
				let messageText = ""
				// messageText = getMarkdownParts(message.respon-se)
				message.response.forEach((r) => {
					const mdPart = r;
					if (r instanceof vscode.ChatResponseMarkdownPart){
						messageText += mdPart.value.value;	
					}
				});
				// stream.markdown(messageText)
				messages.push(
					vscode.LanguageModelChatMessage.Assistant(message)
				)
			})

			// Add teh current prompt - in teh chat to the chat module
			messages.push(
				vscode.LanguageModelChatMessage.User(request.prompt)
			)
		}
		*/
		// stream.markdown(`Current state`)

		// Send the call to the github copilot model - high levle api
		let currentChatResponse = await request.model.sendRequest(
			messages,
			{},
			token
		) // is just a handler and this promise is resolved as soon as the provider starts teh output stream

		// iterate over the async stream and stream teh text resposnes
		for await(let responseTextFragment of currentChatResponse.text){
			stream.markdown(responseTextFragment)
		}
		
	}

	const codeSecurityChecks = vscode.chat.createChatParticipant("code-sec-checker.security-checks", handler)
	
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
