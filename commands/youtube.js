let dispatcher = null

module.exports.run = async (connection, message = null, args = null) => {
    const splitArgs = message.content.split(' ')
    let arg = splitArgs[1].toLowerCase()
    if ( arg && (arg === 'stop' || arg === 'pause') ) {
        dispatcher.pause()
    } else if (arg && (arg === 'resume' || arg === 'play') ) {
        dispatcher.resume()
    } else {
        const ytdl = require('ytdl-core')
        dispatcher = connection.play(ytdl(splitArgs[1]))
    }
}

module.exports.name = 'youtube'

module.exports.usage =
    'youtube <youtubeLink> \n!youtube stop|pause \n!youtube resume|play \n'
