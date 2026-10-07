# Main branch and contributor cleanup

The original repository is saved outside the checkout at `/Users/esoba/Desktop/personal/logbook/esoba-before-revamp.bundle`. Restore an independent checkout with:

```sh
git clone /Users/esoba/Desktop/personal/logbook/esoba-before-revamp.bundle recovered-site
```

The work account attribution came from ten commits authored with `elsoba@deloitte.com`. GitHub calculates repository contributors from commit authors on the default branch; merely renaming a branch or removing collaborator access does not change that attribution. See [GitHub’s contributor documentation](https://docs.github.com/en/repositories/viewing-activity-and-data-for-your-repository/viewing-a-projects-contributors).

Local cleanup preserves commit messages, timestamps, and file contents, replacing only the Deloitte author/committer email with the verified personal account's existing noreply identity, `46572858+esoba@users.noreply.github.com`. Future commits in this checkout use that personal address. Original remote-tracking refs still describe GitHub's old state until publication.

## Apply on GitHub

GitHub CLI was signed out during this work. The local redesign and history cleanup do not change the live website or remote default branch.

After signing in with your personal account using `gh auth login`, run from this checkout:

```sh
# Publish the prepared main branch (the remote previously only had master).
git push -u origin main
# Select main as the default branch.
gh repo edit esoba/esoba.github.io --default-branch main
# Retire the old branch after confirming main and the deployment are healthy.
git push origin --delete master
git remote set-head origin -a
```

A new main branch is used so the old master can remain recoverable during the rollout. No force push of the source branch is needed. If someone creates remote main before these commands run, stop and inspect it instead of overwriting it.

The deployment workflow publishes a single fresh commit to `gh-pages`, so the generated branch does not accumulate old deployment authors. Keep GitHub Pages configured to publish from `gh-pages` at the root. The website remains unchanged until the build and deployment succeed.

The contributor graph can take time to refresh after changing the default branch. This changes attribution on main; it does not remove commit objects cached elsewhere on GitHub. If the old account also has repository collaborator access, remove that access separately in Settings → Collaborators; contributor credit and access are separate systems.

Verify:

```sh
git shortlog -sne main
git log main --format='%ae %ce' | rg -i deloitte
gh repo view esoba/esoba.github.io --json defaultBranchRef
gh run list --workflow deploy.yml --limit 3
```

The `rg` command should have no matches. Original commits remain in the external backup.
