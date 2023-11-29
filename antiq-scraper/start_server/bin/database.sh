 #!/usr/bin/env bash

export SMSDIR="${HOME}/clientPackage/sms-backend"
export SMSFRONT="${HOME}/clientPackage/devias-template"
export SCRAPER="${HOME}/clientPackage/antiq-scraper"


if tput setaf 1 &> /dev/null; then
	tput sgr0; # reset colors
	bold=$(tput bold);
	reset=$(tput sgr0);
	# Solarized colors, taken from http://git.io/solarized-colors.
	black=$(tput setaf 0);
	blue=$(tput setaf 33);
	cyan=$(tput setaf 37);
	green=$(tput setaf 64);
	orange=$(tput setaf 166);
	purple=$(tput setaf 125);
	red=$(tput setaf 140);
	violet=$(tput setaf 61);
	white=$(tput setaf 15);
	yellow=$(tput setaf 136);
else
	bold='';
	reset="\e[0m";
	black="\e[1;30m";
	blue="\e[1;34m";
	cyan="\e[1;36m";
	green="\e[1;32m";
	orange="\e[1;33m";
	purple="\e[1;35m";
	red="\e[1;41m";
	violet="\e[1;35m";
	white="\e[1;37m";
	yellow="\e[1;33m";
fi;


## ----- BACKEND ------- #
start_project() {
    echo "*** ${purple}INITIALIZING PROJECT${reset} ***"

    cd "${SMSDIR}" && command yarn dev:db || {
        echo 'dev:db command failed.' ; exit 1;
    }
    		echo  "${violet} ********* BACKEND DATABASE UP ***********{${reset} "
    sleep 1
    cd "${SCRAPER}" && command docker-compose up -d && command yarn prisma migrate dev && command yarn prisma generate || {
        echo 'docker-compose up failed.' ; exit 1
    }
    sleep 1
    echo "**** "${green}"SCRAPER INITIALIZED ******"
}

start_server() {
    echo "*** STARTING SERVER ***"
    pkill node
    cd "${SCRAPER}" && command node js_bin/dataApi.js &
    cd "${SMSFRONT}" && command yarn run dev -p 3001  &
    cd "${SMSDIR}" && command yarn run dev &
}

start_env() {
    echo "*** ${purple} STARTING ENVIRONMENT  ${reset}***"
    echo "${green}Installing Fresh ChromeDriver..${reset}"
    rm -rf "${SCRAPER}/build/*"
    sleep 1
    echo "${green}ChromeDriver Installed.${reset}"
    echo "${purple}Creating Virtualenv..${reset}"
    cd "${SCRAPER}" && command virtualenv env && cd "${SCRAPER}" && source env/bin/activate
    command pip install -r "${SCRAPER}/requirements.txt" || {
        echo "${red}pip install failed.${reset}" ; exit 1;
    }
    sleep 1
    echo " ${green}*** FINISHED VIRTUAL ENV ***${reset}"
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
