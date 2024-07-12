// src/utils.js
export async function fetchRepoContents(octokit, owner, repo, path = "") {
  try {
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path,
      }
    );

    const contents = await Promise.all(
      data.map(async (item) => {
        if (item.type === "file") {
          return {
            name: item.name,
            path: item.path,
            sha: item.sha,
            size: item.size,
            url: item.url,
            html_url: item.html_url,
            git_url: item.git_url,
            download_url: item.download_url,
            type: "file",
            _links: item._links,
          };
        } else if (item.type === "dir") {
          // Recursively fetch contents of directories
          const nestedContents = await fetchRepoContents(
            octokit,
            owner,
            repo,
            item.path
          );
          return {
            name: item.name,
            path: item.path,
            type: "dir",
            contents: nestedContents,
          };
        }
      })
    );

    return contents;
  } catch (error) {
    console.error("Error fetching repository contents:", error);
    return [];
  }
}
