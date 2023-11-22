const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const packageJsonPath = path.join(__dirname, "package.json");

async function getLatestVersion(packageName) {
  try {
    const response = await axios.get(
      `https://registry.npmjs.org/${packageName}`
    );
    return response.data["dist-tags"].latest;
  } catch (error) {
    console.error(
      `Failed to fetch version for ${packageName}: ${error.message}`
    );
    return null;
  }
}

async function updatePackageVersions(packageJson, depType) {
  if (!packageJson[depType]) {
    console.log(`No ${depType} found in package.json`);
    return {};
  }

  const packageUpdates = Object.entries(packageJson[depType]).map(
    async ([packageName, currentVersion]) => {
      const latestVersion = await getLatestVersion(packageName);
      if (latestVersion && latestVersion !== currentVersion.replace("^", "")) {
        return { packageName, latestVersion: `^${latestVersion}` };
      }
      return { packageName, latestVersion: currentVersion };
    }
  );

  const updatedPackages = await Promise.all(packageUpdates);
  return updatedPackages.reduce((acc, { packageName, latestVersion }) => {
    acc[packageName] = latestVersion;
    return acc;
  }, {});
}

async function fetchAndUpdatePackageJson() {
  try {
    console.log("Reading package.json...");
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf8");
    const packageJson = JSON.parse(packageJsonContent);

    console.log("Package.json contents:", packageJson);
    console.log("Fetching latest versions of packages...");
    const dependencies = await updatePackageVersions(
      packageJson,
      "dependencies"
    );
    const devDependencies = await updatePackageVersions(
      packageJson,
      "devDependencies"
    );

    const updatedPackageJson = {
      ...packageJson,
      dependencies,
      devDependencies,
    };
    console.log("Updating package.json...");
    await fs.writeFile(
      packageJsonPath,
      JSON.stringify(updatedPackageJson, null, 2)
    );

    console.log("package.json has been updated.");
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

fetchAndUpdatePackageJson();
