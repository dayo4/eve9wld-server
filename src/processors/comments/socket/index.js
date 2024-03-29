const {WS, knex} = require("../../../plugins")
const Comments = require("./Services")

/* WEB SOCKET */
const SOCKET = WS.of(/^\/comments\/fetch-\d+$/)
const SUB_SOCKET = WS.of(/^\/subComments\/fetch-\d+$/)

SOCKET.on("connect", socket => {
	let userExist = false
	let room_id
	SOCKET.use((socket, next) => {
		// var handshakeData = socket.request;
		// make sure the handshake data looks good
		// if error do this:
		// next(new Error("not authorized"));
		// else just call next
		next()
	})

	socket.on("fetch", eventData => {
		const data = JSON.parse(eventData)

		room_id = data.post_id
		if (!userExist) {
			socket.join("comm-" + room_id)
			userExist = true
		}
		console.log("All rooms ", socket.rooms)
		Comments.findComments(socket, data)
	})

	socket.on("newComment", () => {
		SOCKET.to("comm-" + room_id).emit("serverUpdated")
		WS.of("/posts/mainfeed").to("posts-mainfeed").emit("serverUpdated")
	})
})

SUB_SOCKET.on("connect", socket => {
	let userExist = false
	let room_id
	SUB_SOCKET.use((socket, next) => {
		next()
	})

	socket.on("fetch", eventData => {
		const data = JSON.parse(eventData)
		room_id = data.parent_id
		if (!userExist) {
			socket.join("subComm-" + room_id)
			userExist = true
		}
		console.log("All sub-rooms ", Object.keys(socket.rooms))
		Comments.findSubComments(socket, data)
	})

	socket.on("newComment", () => {
		SUB_SOCKET.to("subComm-" + room_id).emit("serverUpdated")
	})
})
