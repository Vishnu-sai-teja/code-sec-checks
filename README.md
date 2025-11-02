# Security Checks - VS Code Extension

A comprehensive security analysis extension for Visual Studio Code that helps developers identify and fix security vulnerabilities in their code. This extension leverages AI-powered chat participants to provide detailed security audits and OWASP Top 10 vulnerability assessments.

## Features

### 🔐 AI-Powered Security Analysis
Interact with the **Code Security Checker** chat participant (`@code-sec-checker`) to analyze your code for potential security vulnerabilities. Get detailed findings with:
- Executive summaries highlighting top risks
- Detailed vulnerability analysis with severity ratings
- Example exploit payloads and attack flows
- Precise fixes with secure code snippets
- CWE/OWASP references and defensive controls

### 🛡️ OWASP Top 10 Vulnerability Scanning
Use the `/owasp` command within the chat to perform specialized scans against the OWASP Top 10:
- **A01**: Broken Access Control
- **A02**: Cryptographic Failures
- **A03**: Injection Vulnerabilities
- **A04**: Insecure Design
- **A05**: Security Misconfiguration
- **A06**: Vulnerable & Outdated Components
- **A07**: Identification & Authentication Failures
- **A08**: Software & Data Integrity Failures
- **A09**: Security Logging & Monitoring Failures
- **A10**: Server-Side Request Forgery (SSRF)

### 📄 Multi-File Context Analysis
Tag specific files with `#file:<filename>` to include them in your security analysis, enabling comprehensive cross-file vulnerability detection.

## Usage

### Getting Started

1. Open the VS Code Chat panel (View → Chat or `Cmd+Shift+I` / `Ctrl+Shift+I`)
2. Start a conversation with `@code-sec-checker`
3. Open the file you want to analyze or tag files using `#file:`

### Commands

#### General Security Check
```
@code-sec-checker analyze this code for security vulnerabilities
```

#### OWASP Top 10 Analysis
```
@code-sec-checker /owasp
```

#### Multi-File Analysis
```
@code-sec-checker check these files for security issues
#file:src/app.js
#file:src/auth.js
```

## What You Get

Each security analysis includes:

1. **Executive Summary** - High-level overview of critical risks
2. **Detailed Findings** - For each vulnerability:
   - Severity rating (Critical/High/Medium/Low)
   - Risk and exploit narrative
   - Example attack payload
   - Precise fix with code snippets
   - Defensive controls and references
3. **Prioritized Remediation Checklist** - Action items organized by priority
4. **Refactored Secure Code** - Production-ready code examples

## Requirements

- Visual Studio Code version 1.105.0 or higher
- GitHub Copilot Chat extension (for AI-powered analysis)

## Extension Settings

This extension contributes the following:

- **Chat Participant**: `@code-sec-checker` - Main security analysis interface
- **Commands**: `/owasp` - OWASP Top 10 focused analysis

## Known Issues

None at this time. Please report issues on the GitHub repository.

## Release Notes

### 0.0.1

Initial release of Security Checks extension featuring:
- AI-powered security vulnerability analysis
- OWASP Top 10 vulnerability scanning
- Multi-file context support
- Detailed remediation guidance

---

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## License

See LICENSE file for details.

**Secure coding starts here. Happy auditing! 🔒**
