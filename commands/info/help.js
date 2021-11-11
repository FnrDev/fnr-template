const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");

module.exports = {
    name: "help",
    description: "Get list of all bot commands",
    options: [
        {
            name: "command",
            description: "Command you need help for",
            type: 3
        }
    ],
    usage: "/ping",
    run: async(interaction, client) => {
        const command = interaction.options.getString('command');
        if (command) {
            const cmd = client.commands.get(command.toLowerCase());
            if (!cmd) {
                return interaction.reply({ content: `I can\'t find \`${cmd}\` command`, ephemeral: true })
            }
            const embed = new MessageEmbed()
            .setColor(interaction.guild.me.displayHexColor)
            if (cmd.name) {
                embed.setTitle(`Command: ${cmd.name}`)
            }
            if (cmd.description) {
                embed.setDescription(cmd.description)
            }
            if (cmd.usage) {
                embed.addField('Usage:', cmd.usage)
            }
            if (cmd.timeout) {
                embed.addField('Timeout:', humanizeDuration(cmd.timeout, { round: true }))
            }
            return interaction.reply({ embeds: [embed] })
        }
        let loopHelp = '';
        client.commands.forEach(cmd => {
            loopHelp += `**\`/${cmd.name}\`** - ${cmd.description}\n`
        })
        const embed = new MessageEmbed()
        .setTitle('Help Commands')
        .setDescription(loopHelp)
        .setColor(interaction.guild.me.displayHexColor)
        .setFooter(`Requested by ${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
        return interaction.reply({ embeds: [embed] })
    }
}