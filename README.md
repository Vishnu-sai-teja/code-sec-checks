# code-sec-checks README

This is the README for your extension "code-sec-checks". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

## Features

### Trigger Security Checks
You can trigger the `code-sec-checks` by simply using `@code-sec-checks`. The currently open file in the editor will be analyzed for security vulnerabilities, and a detailed report will be generated.

### OWASP Vulnerability Checks
Use the `/owasp` command to scan your code for OWASP Top 10 vulnerabilities (A1-A10). This ensures your code is evaluated against common security risks.

### File Tagging for Contextual Analysis
Tag specific files with `#files` to include them in the context for security vulnerability evaluation. This allows you to analyze multiple files together for a comprehensive security check.

### Examples

1. **Triggering Security Checks**
    ```
    @code-sec-checks
    ```
    This will analyze the currently open file and generate a security report.

2. **Scanning for OWASP Vulnerabilities**
    ```
    /owasp
    ```
    This will scan the code for OWASP Top 10 vulnerabilities.

3. **Tagging Files for Contextual Analysis**
    ```
    #files
    src/app.js
    src/utils.js
    ```
    The tagged files will be included in the security evaluation.

4. **Combining Commands**
    ```
    @code-sec-checks
    /owasp
    #files
    src/index.js
    ```
    This will trigger a security check, scan for OWASP vulnerabilities, and include the specified file in the analysis.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ... `Security Checker`

## Working with Markdown

You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
