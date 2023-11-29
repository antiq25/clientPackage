 #!/usr/bin/env bash

export SMSDIR="${HOME}/clientPackage/sms-backend"
export SMSFRONT="${HOME}/clientPackage/devias-template"
export SCRAPER="${HOME}/clientPackage/antiq-scraper"

## ----- BACKEND ------- #
start_project() {
    echo "*** INITIALIZING PROJECT ***"
    cd "${SMSDIR}" && command yarn dev:db || {
        echo 'dev:db command failed.' ; exit 1;
    }
    sleep 1
    cd "${SCRAPER}" && command docker-compose up -d && command yarn prisma migrate dev && yarn prisma generate || {
        echo 'docker-compose up failed.' ; exit 1
    }
    sleep 1
    echo "*** SCRAPER INITIALIZED ***"
}

start_server() {
    echo "*** STARTING SERVER ***"
    pkill node
    cd "${SCRAPER}" && command node js_bin/dataApi.js &
    cd "${SMSFRONT}" && command yarn run dev -p 3001  &
    cd "${SMSDIR}" && command yarn run dev &
}

start_env() {
    echo "*** STARTING ENVIRONMENT ***"
    echo "Installing Fresh ChromeDriver.."
    rm -rf "${SCRAPER}/build/*"
    sleep 1
    echo "ChromeDriver Installed."
    echo "Creating Virtualenv.."
    cd "${SCRAPER}" && command virtualenv env && cd "${SCRAPER}" && source env/bin/activate
    command pip install -r "${SCRAPER}/requirements.txt" || {
        echo 'pip install failed.' ; exit 1;
    }
    sleep 1
    echo " *** FINISHED VIRTUAL ENV ***"
    echo "starting servers.."
}

start_install() {
    echo "*** STARTING INSTALLATION ***"
    cd "${SMSDIR}" && command package-updater
    sleep 1
      command yarn
    sleep 1
    echo "*** BACKEND INITIALIZED *** "
    ## ------ FRONT END ------ ##
    cd "${SMSFRONT}" && command package-updater
    sleep 1
    command yarn
    sleep 1
    echo "*** FRONTEND INITIALIZED ***"
    ## ------- SCRAPER --------- ##
    cd "${SCRAPER}" && command package-updater && command yarn
}

main_menu() {
    while true; do
        clear
        echo "type help to see cmds"
        echo "  ├── 1 install"
        echo "  ├── 2 database"
        echo "  ├── 3 env"
        echo "  ├── 4 server"
        read -r choice
        case $choice in
            "1")
                start_install
                break
            ;;
            "2")
                start_project
                break
            ;;
            "3")
                start_env
                break
            ;;
            "4")
                start_server
                break
            ;;
            "exit")
                echo "Exiting..."
                break
            ;;
            *)
                echo "Invalid choice. Please try again."
                sleep 2
            ;;
        esac
    done
}

# Call the main menu function to start the script
main_menu
