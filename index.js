const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client/Client');
const discloud = require("discloud-status");

const serverStats = {
	djRAM: '681298599560216580',
	pingID: '682027924186202112',
	totalUsersID: '682068696293703684',

	//uptime
	diassID: '682028014799814736',
	horasID: '682028078482194474',
	minnID: '682028118747381767',
}

const {
	prefix,
	token,
} = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}


client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		command.execute(message);
	} catch (error) {
	}
});

client.on('ready', () => {

	//DJ Vinicius
	setInterval(function () {
		let r = discloud.ram();
		client.channels.get(serverStats.djRAM).setName("⚙️ RAM: " + r);
	}, 10000)


	setInterval(function () { client.user.setActivity(`Soundpad com ${client.users.size} usuários, em ${client.guilds.size} servidores.`); }, 30000);
	setInterval(function () { client.channels.get(serverStats.pingID).setName(`📶 Ping: ${Math.round(client.ping)}ms`); }, 5000);
	setInterval(function () {client.channels.get(serverStats.totalUsersID).setName(`🎧 Usuários: ${client.users.size}`); }, 10000);
	setInterval(function () {
		const min = Math.floor((client.uptime / (1000 * 60)) % 60).toString()
		const hrs = Math.floor((client.uptime / (1000 * 60 * 60)) % 24).toString()
		const dias = Math.floor((client.uptime / (1000 * 60 * 60 * 24)) % 60).toString()

		if (min <= 01) {
			client.channels.get(serverStats.minnID).setName(`⏱️ ${min.padStart(2, '0')} Minuto`);
		} else {
			client.channels.get(serverStats.minnID).setName(`⏱️ ${min.padStart(2, '0')} Minutos`);
		}
		if (hrs <= 01) {
			client.channels.get(serverStats.horasID).setName(`⏱️ ${hrs.padStart(2, '0')} Hora`);
		} else {
			client.channels.get(serverStats.horasID).setName(`⏱️ ${hrs.padStart(2, '0')} Horas`);
		}
		if (dias <= 01) {
			client.channels.get(serverStats.diassID).setName(`⏱️ ${dias.padStart(2, '0')} Dia`);
		} else {
			client.channels.get(serverStats.diassID).setName(`⏱️ ${dias.padStart(2, '0')} Dias`);
		}

	}, 5000)
});

client.login(token);
