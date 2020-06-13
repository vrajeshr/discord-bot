module.exports.run = async (connection, message = null, args = null) => {
    connection.play('./audio-files/doh.mp3', {
        volume: 1
    })
}

module.exports.name = 'doh'
