#!/usr/bin/env bash

export SMSDIR="${HOME}/gg/sms-backend"
export SMSFRONT="${HOME}/gg/devias-template"
export SCRAPER="${HOME}/gg/antiq-scraper"

## ----- BACKEND ------- #
start_project() {
    cd ${SCRAPER} && command yarn && command docker-compose up -d && command yarn prisma generate && command yarn prisma migrate dev && cd ${SMSDIR} && command yarn dev:db
    sleep 1
    echo "*** SCRAPER INITILIZED ***"
}

start_server() {
    pkill node
    cd "${SCRAPER}" && command node js_bin/dataApi.js &
    cd "${SMSFRONT}" && command yarn run dev -p 3001 &
    cd "${SMSDIR}" && command yarn run dev &
}

start_env() {
    echo "Installing Fresh CHromeDriver.."
    rm -rf "${SCRAPER}/build/*"
    sleep 1
    echo "ChromeDriver Installed."
    echo "Creating Virtualenv.."
    cd "${SCRAPER}" && command virtualenv env && cd "${SCRAPER}" && source env/bin/activate
    command pip install -r "${SCRAPER}/requirements.txt"
    sleep 1
    echo " *** FINISHED VIRTUAL ENV ***"
    echo "starting servers.."
}

start_install() {
    cd "${SMSDIR}" && command package-updater
    sleep 1
    command yarn
    sleep 1
    echo "*** BACKEND INITILIAZED *** "
    ## ------ FRONT END ------ ##
    cd "${SMSFRONT}" && command package-updater
    sleep 1
    command yarn
    sleep 1
    echo "*** FRONTEND INITILIAZED ***"
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
