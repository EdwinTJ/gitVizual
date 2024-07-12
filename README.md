# gitVizual

gitvizual is a Node.js command-line tool to visualize the structure of GitHub repositories.

## Installation

To use gitvizual, you need to have Node.js and npm installed on your machine.

1. Install gitvizual globally using npm:

   ```bash
   npm i gitvizual
   ```

2. Set up your GitHub access token:

   - Create a .env file in the root of your project with your GitHub token:

   GITHUB_TOKEN=your_github_token_here

   ```bash
   GITHUB_TOKEN=your_github_token_here
   ```

   - Replace your_github_token_here with your actual GitHub access token. Make sure to keep your .env file secure and do not share it publicly.

## Usage

After installation and setting up your GitHub token, you can use gitvizual from the command line:

```bash
gitvizual <owner> <repo>
```

Replace `<owner>` and `<repo>` with the GitHub owner (username or organization) and repository name you want to visualize.

### Contributing

If you find any issues with gitvizual or have suggestions for improvements, feel free to open an issue or submit a pull request on GitHub.

### License

This project is licensed under the MIT License.
