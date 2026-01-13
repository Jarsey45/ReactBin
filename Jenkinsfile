pipeline {
    agent any
    stages {
        stage("Restore npm packages") {
            steps {
                writeFile file: "next-lock.cache", text: "$GIT_COMMIT"

                cache(caches: [
                    arbitraryFileCache(
                        path: "node_modules",
                        includes: "**/*",
                        cacheValidityDecidingFile: "package-lock.json"
                    )
                ]) {
                    sh "npm install"
                }
            }
        }
        stage("Build") {
            steps {
                writeFile file: "next-lock.cache", text: "$GIT_COMMIT"

                cache(caches: [
                    arbitraryFileCache(
                        path: ".next/cache",
                        includes: "**/*",
                        cacheValidityDecidingFile: "next-lock.cache"
                    )
                ]) {
                    sh "npm run build"
                }
            }
        }
        stage("Test") {
            steps {
                echo "Testing the app..."
            }
        }
        stage("Deploy") {
            steps {
                echo "Deploying the app..."
            }
        }
    }
}
