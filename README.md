# React Admin Packages

Multiple packages adding components and functionalities to **react-admin**. Monorepo with semver.

# Developer instructions

In order to add a new package create a subfolder in `packages/` with the correct package name.
Scoping the package name is required to publish the release.

Packages should declare only the minimal dependencies, and define as peer those which are expected to be provided by the application.

To release a package merge into master, and then annotate with a tag following the schema

`<package-name>/<release-number>`.

Do NOT add release tags to feature branches.

