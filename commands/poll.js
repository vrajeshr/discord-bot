module.exports.run = async (message) => {
    let numbers = require('../Constants').numbers
    const splitArgs = message.content.split('"').slice(1)
    let poll_output_string = ''

    let i = 1
    for (let x = 0; x < splitArgs.length; x += 2, i++) {
        poll_output_string += i + '. `' + splitArgs[x] + '`\n'
    }

    message.channel.send(poll_output_string).then((msg) => {
        for (let x = 1; x < i; x++) {
            msg.react(numbers[x - 1])
        }
    })
}

module.exports.name = 'poll'

module.exports.usage = 'poll "something" "something" ... \n'
