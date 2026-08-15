# Contributing to Simple Interest Calculator

Thank you for your interest in contributing to the Simple Interest Calculator! We welcome contributions from the community. Please follow these guidelines to make the contribution process smooth and effective.

## How to Contribute

### Reporting Bugs

If you encounter a bug, please create an issue with the following information:
- A clear, descriptive title
- A detailed description of the bug
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots (if applicable)
- Your environment (OS, Python version, browser, etc.)

### Suggesting Enhancements

We love new ideas! To suggest an enhancement:
1. Open an issue with the title starting with `[FEATURE REQUEST]`
2. Describe the enhancement in detail
3. Explain the use case and why it would be beneficial
4. Provide examples if applicable

### Submitting Pull Requests

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/Simple-interest-calculator-by-Kathir.git
   cd Simple-interest-calculator-by-Kathir
   ```

3. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes** and ensure they follow the project's coding style

5. **Test your changes** thoroughly:
   - For Python: Test the Flask backend with different inputs
   - For Frontend: Test in multiple browsers and devices
   - Verify the calculator produces correct results

6. **Commit your changes** with clear, descriptive messages:
   ```bash
   git commit -m "Add feature: description of what you added"
   git commit -m "Fix: description of bug you fixed"
   ```

7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Open a Pull Request** with:
   - A clear title describing your changes
   - A detailed description of what you changed and why
   - Reference any related issues (e.g., "Fixes #123")
   - Screenshots of UI changes (if applicable)

## Coding Standards

### Python (Flask Backend)
- Follow PEP 8 style guide
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and single-purpose
- Test your changes before submitting

### JavaScript (Frontend)
- Use ES6+ syntax
- Write clear, self-documenting code
- Use meaningful variable and function names
- Maintain consistent indentation (2 spaces)
- Avoid inline styles; use CSS classes

### CSS
- Follow BEM naming convention for classes
- Use CSS variables for consistency
- Ensure responsive design (mobile-first approach)
- Test on different screen sizes

## Project Setup for Development

1. **Create a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the development server**:
   ```bash
   python app.py
   ```

4. **Open in browser**:
   Navigate to `http://127.0.0.1:5000`

## Testing

Before submitting a pull request:
- Test the calculator with various inputs
- Verify calculations are accurate
- Check browser console for JavaScript errors
- Ensure the Flask server handles edge cases gracefully
- Test on mobile devices if possible

## Code Review Process

1. A maintainer will review your pull request
2. We may request changes or ask clarifying questions
3. Once approved, your changes will be merged
4. Your contribution will be acknowledged in the project

## Behavior Standards

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for all contributors.

## Questions or Need Help?

- Check existing issues and pull requests
- Open a new issue with the `[QUESTION]` tag
- Contact: kathirvel29072007@gmail.com

## License

By contributing to this project, you agree that your contributions will be licensed under the Apache License 2.0.

---

Thank you for contributing! Your efforts help make this project better for everyone. 🎉
