prn_versions(){
	echo "--- nodejs versions:"
	node -v
	npm -v
}

clean(){
	rm -rf dist
}

compile() {
	echo DEFAULT_LOGIN $1
	echo DEFAULT_PASSWORD $2
	node -v
	npm run build
	# npm i && cross-env NODE_ENV=production webpack DEFAULT_LOGIN=$1 DEFAULT_PASSWORD=$2
}

# Бамба собирает по этой команде
# bash run.sh dist
dist(){
	prn_versions
	clean
	compile $1 $2
	echo "--finished"
}



"$@"
