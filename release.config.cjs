/**
 * Determines the CI platform (GitHub Actions or GitLab CI) based on the environment variables.
 * Returns the corresponding semantic-release plugin configuration.
 *
 * @returns {string[]} An array containing the appropriate plugin for the CI platform:
 *                     - `["@semantic-release/github"]` if the CI platform is GitHub Actions
 *                     - `["@semantic-release/gitlab"]` if the CI platform is GitLab CI
 *                     - An empty array `[]` for unknown CI platforms or local environments
 */
const getCIPlatformConfiguration = () => {
	if (process.env.GITHUB_ACTIONS) {
		// Use the GitHub plugin when running on GitHub Actions
		return [["@semantic-release/github", {
			assets: [
				{ path: "main.js" }
				, { path: "styles.css" }
				, { path: "manifest.json" }
			]
		}
		]];
	} else if (process.env.GITLAB_CI) {
		// Use the GitLab plugin when running on GitLab CI
		return [["@semantic-release/gitlab", {
			assets: [
				{ path: "main.js", type: "other", target: "project_upload" }
				, { path: "styles.css", type: "other", target: "project_upload" }
				, { path: "manifest.json", type: "other", target: "project_upload" }
			]
		}
		]];
	} else {
		// Return an empty array if the CI environment is unknown or a local environment
		return [];
	}
};

module.exports = {
	branches: ["main"]
	, plugins: [
		[
			"@semantic-release/commit-analyzer"
			, {
				preset: "angular"
				, releaseRules: [
					{ type: "config", release: "patch" } // Treat config changes as a patch
					, { type: "feat", release: "minor" } // Features trigger a minor release
					, { type: "fix", release: "patch" } // Bug fixes trigger a patch release
					, { type: "perf", release: "patch" } // Performance improvements as patches
					, { type: "refactor", release: "patch" } // Refactors treated as patches
				]
			}
		]
		, [
			"@semantic-release/release-notes-generator",
			{
			  preset: "conventionalcommits",
			  presetConfig: {
				types: [
				  { type: "config", section: "Configuration Updates" },
				  { type: "feat", section: "Features" },
				  { type: "fix", section: "Bug Fixes" },
				  { type: "perf", section: "Performance Improvements" },
				  { type: "refactor", section: "Code Refactoring" },
				  { type: "chore", hidden: true },
				  { type: "docs", hidden: true },
				  { type: "style", hidden: true },
				  { type: "test", hidden: true },
				  { type: "build", hidden: true },
				  { type: "ci", hidden: true },
				  { type: "revert", hidden: true },
				],
			  },
			},
		  ] // Generates release notes from commit history
		, ...getCIPlatformConfiguration() // Load CI-specific plugins (GitHub or GitLab) based on the CI platform
		, "@semantic-release/changelog"
		, [ // Analyzes commit messages to determine version bumps
			"semantic-release-replace-plugin"
			, {
				replacements: [
					{
						files: ["manifest.json"]
						, from: '"version": ".*"' // Regex pattern to match the current version field
						, to: '"version": "${nextRelease.version}"' // Replace the version with the new release version
						, results: [
							{
								file: "manifest.json"
								, hasChanged: true
								, numMatches: 1
								, numReplacements: 1
							}
						]
						, countMatches: true // Ensure that at least one replacement has occurred
					}
				]
			}
		] // Replaces version in the manifest.json file
		, ["@semantic-release/git", { assets: ["CHANGELOG.md", "manifest.json"] }] // Commits only changelog and manifest
	]
    , "repositoryUrl": `${process.env.CI_PROJECT_URL}.git` // Git repository URL for the project
};
