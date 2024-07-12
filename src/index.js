#!/usr/bin/env node

import { fetchRepoContents } from "./utils.js";
import { Octokit } from "octokit";
import "dotenv/config";

const token = process.env.GITHUB_TOKEN;

const octokitInstance = new Octokit({
  auth: token,
});

function displayRepositoryStructure(contents, indent = 0) {
  contents.forEach((item) => {
    const indentation = "  ".repeat(indent);
    if (item.type === "file") {
      console.log(`${indentation}- ${item.name}`);
    } else if (item.type === "dir") {
      console.log(`${indentation}- ${item.name}/`);
      displayRepositoryStructure(item.contents, indent + 1); // Recursively display contents of directories
    }
  });
}

async function main() {
  // Fetch from command line arguments
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Usage: gitvizual <owner> <repo>");
    return;
  }

  const owner = args[0];
  const repo = args[1];

  try {
    const repoContents = await fetchRepoContents(octokitInstance, owner, repo);
    displayRepositoryStructure(repoContents);
  } catch (error) {
    console.error("Failed to fetch repository contents:", error);
  }
}

main();
