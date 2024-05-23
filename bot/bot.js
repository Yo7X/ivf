require('dotenv').config();
const token = process.env.TOKEN
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const axios = require('axios');
const cheerio = require('cheerio');

//Perms
const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
    ] 
});




client.once('ready', (c) => {
    console.log(`${c.user.username} is online`);
});



const helpEmbed = new EmbedBuilder()
    .setColor(0x5100ff)
    .setTitle('Identity V info - Help')
    .setURL('https://yo7x.github.io/ivf/')
    .setAuthor({ name: 'Yo7', iconURL: 'https://yt3.googleusercontent.com/h3G4dZJmOd2Kt4akVLEEwu5QA5zyEP1zAKIVWXHcw5OSfLHqWDgxFGJWpvPm4KTulyierUnu=s176-c-k-c0x00ffffff-no-rj', url: 'https://www.youtube.com/channel/UCnHHxFU-nYnuKMC7TKnhXqA' })
    .setThumbnail('https://raw.githubusercontent.com/Yo7X/IDV-T/main/Identity%20V%20tools/img/Icon.png')
    .addFields(
        { name: 'Hosting changes', value: 'IDVI has now fully moved to new hosting :D However I still need some time to bring over many of the older commands and update everything.' },
        { name: 'Documentation', value: '[Command list](https://yo7x.github.io/ivf/) • [Change log](https://yo7x.github.io/ivf/) • [support server](https://discord.gg/WqvsKqURPr) • [Report bugs](https://yo7x.github.io/ivf/)' },
        { name: 'Support the bot', value: '[Invite](https://discord.com/oauth2/authorize?client_id=970014291413565520&permissions=8&scope=bot%20applications.commands) • [Website](https://yo7x.github.io/ivf/) • [Donate](https://paypal.me/Yo7dv?country.x=CA&locale.x=en_US)' },
        { name: 'Legal', value: '[Privacy policy](https://yo7x.github.io/ivf/pp) • [Terms of Service](https://yo7x.github.io/ivf/tos)' },
    )
    //.setImage('https://i.imgur.com/AfFp7pu.png')
    .setFooter({ text: 'Last updated • 13/5/2024', iconURL: 'https://raw.githubusercontent.com/Yo7X/IDV-T/main/Identity%20V%20tools/img/Icon.png' });


const jokes = [
    'I made a belt out of clocks ||it was a waist of time||',
    'When I was young I was told I could be anyone I wanted. ||Turns out identity theft is a crime.||',
    'Bloody queen decided to take up a job hanging mirrors ||because is was something she could see herself doing||',
    'what do you call a missed blink? ||A 3 survivor escape||',
    'what is a typo on a tombstone called ||a grave mistake||'
];

const survivors = [
    'Lucky guy',
    `Doctor`,
    'Lawyer',
    'Thief',
    `Gardener`,
    `Magician`,
    `Explorer`,
    `Mercenary`,
    `Coordinator`,
    `Mechanic`,
    `Forward`,
    `Mind's Eye`,
    `Priestess`,
    `Perfumer`,
    `Cowboy`,
    `Female Dancer`,
    `Seer`,
    `Embalmer`,
    `Prospector`,
    `Enchantress`,
    `Wildling`,
    `Acrobat`,
    `First Officer`,
    `Barmaid`,
    `Postman`,
    `Grave Keeper`,
    `Prisoner`,
    `Entomologist`,
    `Painter`,
    `Batter`,
    `Toy Merchant`,
    `Patient`,
    `Psychologist`,
    `Novelist`,
    `Little Girl`,
    `Weeping Clown`,
    `Professor`,
    `Antiquarian`,
    `Journalist`,
    'Cheerleader',
    `Puppeteer`
];

const hunters = [
    'Hell Ember',
    `Smiley Face`,
    'The Ripper',
    'Gamekeeper',
    `Soul Weaver`,
    `Geisha`,
    `Feaster`,
    `Wu Chang`,
    `Photographer`,
    `Mad Eyes`,
    `Dream Witch`,
    `Axe Boy`,
    `Evil Reptilian`,
    `Bloody Queen`,
    `Guard 26`,
    `Disciple`,
    `Violinist`,
    `Sculptor`,
    `Undead`,
    `Breaking Wheel`,
    `Naiad`,
    `Wax Artis`,
    `Nightmare`,
    `Clerk`,
    `Hermit`,
    `Night watch`,
    `Opera Singer`,
    `The shadow`
];





//Look for commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    //Skill
    async function createEmbed(url, title, thumbnailTitle) {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let skillNames = []
        let skills = []

        let skillTable = $('table').length;
        let skillTableNumber;

        for (let i = 0; i < skillTable; i++) {
            if ($('table').eq(i).find('th').text().trim().includes('External Traits') && $('table').eq(i).find('th').text().trim().includes('Description')) {
                skillTableNumber = i
            };
        };

        const tableLength = $('table').eq(skillTableNumber).find('tr').length;

        for (let i = 2; i < tableLength; i++) {
            skillNames.push($('table').eq(skillTableNumber).find('tr').eq(i).find('td').eq(0).text().trim())
            skills.push($('table').eq(skillTableNumber).find('tr').eq(i).find('td').eq(1).text().trim())
        }

        const skillsEmbed = new EmbedBuilder()
            .setColor(0x5100ff)
            .setTitle(`**${title} skills**`)
            .setThumbnail(thumbnailTitle)
            .setFooter({ text: '*This character page supports live updating' });
        skillNames.forEach((skill, index) => {
            if (skills[index].length > 1024) {
                temp = skills[index].slice(0,1000)
                temp1 = skills[index].slice(1000, skills[index].length)

                //console.log(temp.length, temp1.length)
                skillsEmbed.addFields({ name: `${skill}`, value: `${temp}` })
                skillsEmbed.addFields({ name: '\u200B', value: `${temp1}` })
            } else {
                skillsEmbed.addFields({ name: `${skill}`, value: `${skills[index]}` })
            }
        })

        await interaction.reply({ embeds: [skillsEmbed] });
    }

    async function createEmbed02(url, title, thumbnailTitle) {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        let externalTraitNames = []
        let externalTraits = []

        let skillNames = []
        let skillPresence = []
        let skills = []

        let skillTable = $('table').length;
        let skillTableNumber;

        for (let i = 0; i < skillTable; i++) {
            if ($('table').eq(i).find('th').text().trim().includes('External Traits') && $('table').eq(i).find('th').text().trim().includes('Description')) {
                skillTableNumber = i
            };
        };

        for (let i = 2; i < $('table').eq(skillTableNumber).find('tr').length; i++) {
            if ($('table').eq(skillTableNumber).find('tr').eq(i).find('td').length == 0) {
                //nothing
            } else if ($('table').eq(skillTableNumber).find('tr').eq(i).find('td').length == 2) {

                externalTraitNames.push($('table').eq(skillTableNumber).find('tr').eq(i).find('td').eq(0).text().trim())
                externalTraits.push($('table').eq(skillTableNumber).find('tr').eq(i).find('td').eq(1).text().trim())

            } else if ($('table').eq(skillTableNumber).find('tr').eq(i).find('td').length == 3) {

                skillNames.push($('table').eq(skillTableNumber).find('tr').eq(i).find('td').eq(0).text().trim())
                skillPresence.push($('table').eq(skillTableNumber).find('tr').eq(i).find('td').eq(1).text().trim())
                skills.push($('table').eq(skillTableNumber).find('tr').eq(i).find('td').eq(2).text().trim())

            }
        }

        const skillsEmbed = new EmbedBuilder()
            .setColor(0x5100ff)
            .setTitle(`**${title} skills**`)
            .setThumbnail(thumbnailTitle)
            .setFooter({ text: '*This character page supports live updating' });

        externalTraitNames.forEach((skill, index) => {
            if (externalTraits[index].length > 1024) {
                temp = externalTraits[index].slice(0, 1000)
                temp1 = externalTraits[index].slice(1000, externalTraits[index].length)

                skillsEmbed.addFields({ name: `${skill}`, value: `${temp}` })
                skillsEmbed.addFields({ name: '\u200B', value: `${temp1}` })
            } else {
                skillsEmbed.addFields({ name: `${skill}`, value: `${externalTraits[index]}` })
            }
        })

        skillNames.forEach((skill, index) => {
            if (skills[index].length > 1024) {
                temp = skills[index].slice(0, 1000)
                temp1 = skills[index].slice(1000, skills[index].length)

                skillsEmbed.addFields({ name: `${skill} - ${skillPresence[index]} Presence`, value: `${temp}` })
                skillsEmbed.addFields({ name: '\u200B', value: `${temp1}` })
            } else {
                skillsEmbed.addFields({ name: `${skill} - ${skillPresence[index]} Presence`, value: `${skills[index]}` })
            }
        })

        await interaction.reply({ embeds: [skillsEmbed] });
    }

    switch (commandName) {
        case 'help': 
            await interaction.reply({ embeds: [helpEmbed] });
        break;
        case 'skill':
            character = interaction.options.get('character').value.toLowerCase()

            switch (character) {
                case 'lucky guy':
                case 'deduction substitute':
                    createEmbed('https://id5.fandom.com/wiki/Lucky_Guy', 'Lucky guy', 'https://static.wikia.nocookie.net/id5/images/9/92/LuckyGuy.png/revision/latest?cb=20200516014000');
                break;
                case 'doctor':
                case 'emily':
                case 'emily dyer':
                    createEmbed('https://id5.fandom.com/wiki/Doctor', 'Doctor', 'https://static.wikia.nocookie.net/id5/images/6/6c/Doctor.png/revision/latest?cb=20240215003319');
                break;
                case 'lawyer':
                case 'freddy':
                case 'freddy riley':
                    createEmbed('https://id5.fandom.com/wiki/Lawyer', 'Lawyer', 'https://static.wikia.nocookie.net/id5/images/1/1a/Lawyer.png/revision/latest?cb=20200923145139');
                break;
                case 'thief':
                case 'kreacher':
                case 'kreacher pierson':
                    createEmbed('https://id5.fandom.com/wiki/Thief', 'Thief', 'https://static.wikia.nocookie.net/id5/images/f/fc/Thief.png/revision/latest?cb=20240214213341');
                break;
                case 'gardener':
                case 'emma':
                case 'emma woods':
                    createEmbed('https://id5.fandom.com/wiki/Gardener', 'Gardener', 'https://static.wikia.nocookie.net/id5/images/1/19/Gardener.png/revision/latest?cb=20200923142116');
                break;
                case 'magician':
                case 'servais':
                case 'servais le roy':
                    createEmbed('https://id5.fandom.com/wiki/Magician', 'Magician', 'https://static.wikia.nocookie.net/id5/images/c/ca/Magician.png/revision/latest?cb=20240214212356');
                break;
                case 'explorer':
                case 'kurt':
                case 'kurt frank':
                    createEmbed('https://id5.fandom.com/wiki/Mercenary', 'Explorer', 'https://static.wikia.nocookie.net/id5/images/c/ca/Explorer.png/revision/latest?cb=20200923150545');
                break;
                case 'mercenary':
                case 'naib':
                case 'naib subedar':
                    createEmbed('https://id5.fandom.com/wiki/Mercenary', 'Mercenary', 'https://static.wikia.nocookie.net/id5/images/0/00/Mercenary.png/revision/latest?cb=20210103193621');
                break;
                case 'coordinator':
                case 'martha':
                case 'martha behamfil':
                    createEmbed('https://id5.fandom.com/wiki/Coordinator', 'Coordinator', 'https://static.wikia.nocookie.net/id5/images/b/b1/Coordinator.png/revision/latest?cb=20200524022809');
                break;
                case 'mechanic':
                case 'tracy':
                case 'tracy reznik':
                    createEmbed('https://id5.fandom.com/wiki/Mechanic', 'Mechanic', 'https://static.wikia.nocookie.net/id5/images/5/55/Mechanic.png/revision/latest?cb=20210213162134');
                break;
                case 'forward':
                case 'william':
                case 'william ellis':
                    createEmbed('https://id5.fandom.com/wiki/Forward', 'Forward', 'https://static.wikia.nocookie.net/id5/images/0/0e/Forward.png/revision/latest?cb=20220903214950');
                break;
                case 'the minds eye':
                case 'minds eye':
                case 'tme':
                case 'helena':
                case 'helena adams':
                    createEmbed('https://id5.fandom.com/wiki/The_Mind%27s_Eye', 'The minds eye', 'https://static.wikia.nocookie.net/id5/images/0/0d/TheMindsEye.png/revision/latest?cb=20200524023610');
                break;
                case 'priestess':
                case 'fiona':
                case 'fiona gilman':
                    createEmbed('https://id5.fandom.com/wiki/Priestess', 'Priestess', 'https://static.wikia.nocookie.net/id5/images/b/bc/Priestess.png/revision/latest?cb=20200516014405');
                break;
                case 'perfumer':
                case 'vera':
                case 'vera nair':
                    createEmbed('https://id5.fandom.com/wiki/Perfumer', 'Perfumer', 'https://static.wikia.nocookie.net/id5/images/3/31/Perfumer.png/revision/latest?cb=20220806210828');
                break;
                case 'cowboy':
                case 'kevin':
                case 'kevin ayuso':
                    createEmbed('https://id5.fandom.com/wiki/Cowboy', 'Cowboy', 'https://static.wikia.nocookie.net/id5/images/8/89/Cowboy.png/revision/latest?cb=20200923150853');
                break;
                case 'female dancer':
                case 'dancer':
                case 'margaretha':
                case 'margaretha zelle':
                    createEmbed('https://id5.fandom.com/wiki/Female_Dancer', 'Female dancer', 'https://static.wikia.nocookie.net/id5/images/1/1d/FemaleDancer.png/revision/latest?cb=20200524024254');
                break;
                case 'seer':
                case 'eli':
                case 'eli clark':
                    createEmbed('https://id5.fandom.com/wiki/Seer', 'Seer', 'https://static.wikia.nocookie.net/id5/images/e/ee/Seer.png/revision/latest?cb=20190325040259');
                break;
                case 'embalmer':
                case 'aesop':
                case 'aesop carl':
                    createEmbed('https://id5.fandom.com/wiki/Embalmer', 'Embalmer', 'https://static.wikia.nocookie.net/id5/images/c/cf/Embalmer.png/revision/latest?cb=20181231032332');
                break;
                case 'prospector':
                case 'norton':
                case 'norton campbell':
                    createEmbed('https://id5.fandom.com/wiki/Prospector', 'Prospector', 'https://static.wikia.nocookie.net/id5/images/a/ae/Prospector.png/revision/latest?cb=20200119021306');
                break;
                case 'enchantress':
                case 'patricia':
                case 'patricia dorval':
                    createEmbed('https://id5.fandom.com/wiki/Enchantress', 'enchantress', 'https://static.wikia.nocookie.net/id5/images/9/99/Enchantress.png/revision/latest?cb=20200116023831');
                break;
                case 'wildling':
                case 'Murro':
                    createEmbed('https://id5.fandom.com/wiki/Wildling', 'Wildling', 'https://static.wikia.nocookie.net/id5/images/b/bb/Wildling.png/revision/latest?cb=20200524022245');
                break;
                case 'acrobat':
                case 'mike':
                case 'mike morton':
                    createEmbed('https://id5.fandom.com/wiki/Acrobat', 'Acrobat', 'https://static.wikia.nocookie.net/id5/images/8/8f/Acrobat.png/revision/latest?cb=20200524024842');
                break;
                case 'first officer':
                case 'officer':
                case 'jose':
                case 'jose baden':
                    createEmbed('https://id5.fandom.com/wiki/First_Officer', 'First officer', 'https://static.wikia.nocookie.net/id5/images/a/a3/FirstOfficer.png/revision/latest?cb=20200103184549');
                break;
                case 'barmaid':
                case 'demi':
                case 'demi bourbon':
                    createEmbed('https://id5.fandom.com/wiki/Barmaid', 'Barmaid', 'https://static.wikia.nocookie.net/id5/images/c/cd/Barmaid.png/revision/latest?cb=20200524025214');
                break;
                case 'postman':
                case 'victor':
                case 'victor grantz':
                    createEmbed('https://id5.fandom.com/wiki/Postman', 'Postman', 'https://static.wikia.nocookie.net/id5/images/1/16/Postman.png/revision/latest?cb=20200314151358');
                break;
                case 'grave keeper':
                case 'andrew':
                case 'andrew kreiss':
                    createEmbed('https://id5.fandom.com/wiki/Grave_Keeper', 'Grave keeper', 'https://static.wikia.nocookie.net/id5/images/e/e9/GraveKeeper.png/revision/latest/scale-to-width-down/1000?cb=20210521043902');
                break;
                case 'prisoner':
                case 'luca':
                case 'luca balsa':
                    createEmbed('https://id5.fandom.com/wiki/%22Prisoner%22', 'Prisoner', 'https://static.wikia.nocookie.net/id5/images/7/71/Prisoner.png/revision/latest?cb=20200516014120');
                break;
                case 'entomologist':
                case 'melly':
                case 'melly plinius':
                    createEmbed('https://id5.fandom.com/wiki/Entomologist', 'Entomologist', 'https://static.wikia.nocookie.net/id5/images/5/53/Entomologist.png/revision/latest/scale-to-width-down/1000?cb=20200721005459');
                break;
                case 'painter':
                case 'edgar':
                case 'edgar valden':
                    createEmbed('https://id5.fandom.com/wiki/Painter', 'Painter', 'https://static.wikia.nocookie.net/id5/images/2/24/Painter.png/revision/latest/scale-to-width-down/1000?cb=20201007012729');
                break;
                case 'batter':
                case 'ganji':
                case 'ganji gupta':
                    createEmbed('https://id5.fandom.com/wiki/Batter', 'Batter', 'https://static.wikia.nocookie.net/id5/images/7/7c/Batter.png/revision/latest?cb=20210226051003');
                break;
                case 'toy merchant':
                case 'anne':
                case 'anne lester':
                    createEmbed('https://id5.fandom.com/wiki/Toy_Merchant', 'Toy merchant', 'https://static.wikia.nocookie.net/id5/images/a/a2/ToyMerchant.png/revision/latest?cb=20210730023931');
                break;
                case 'patient':
                case 'emil':
                    createEmbed('https://id5.fandom.com/wiki/Patient', 'Patient', 'https://static.wikia.nocookie.net/id5/images/e/e6/Patient.png/revision/latest?cb=20211118005351');
                break;
                case 'psychologist':
                case 'ada':
                case 'ada mesmer':
                    createEmbed('https://id5.fandom.com/wiki/%22Psychologist%22', 'Psychologist', 'https://static.wikia.nocookie.net/id5/images/b/b1/Psychologist.png/revision/latest?cb=20211111122243');
                break;
                case 'novelist':
                case 'orpheus':
                    createEmbed('https://id5.fandom.com/wiki/Novelist', 'Novelist', 'https://static.wikia.nocookie.net/id5/images/1/16/Novelist.png/revision/latest?cb=20220106030950');
                break;
                case 'little girl':
                case 'memory':
                    createEmbed('https://id5.fandom.com/wiki/%22Little_Girl%22', 'Little girl', 'https://static.wikia.nocookie.net/id5/images/0/0f/LittleGirl.png/revision/latest?cb=20220106030820');
                break;
                case 'weeping clown':
                case 'joker':
                    createEmbed('https://id5.fandom.com/wiki/Weeping_Clown', 'Weeping clown', 'https://static.wikia.nocookie.net/id5/images/9/9e/WeepingClown.png/revision/latest?cb=20220907172352');
                break;
                case 'professor':
                case 'luchino':
                case 'luchino diruse':
                    createEmbed('https://id5.fandom.com/wiki/Professor', 'Professor', 'https://static.wikia.nocookie.net/id5/images/b/b1/Professor.png/revision/latest?cb=20220904011941');
                break;
                case 'antiquarian':
                case 'qi':
                case 'qi shiyi':
                    createEmbed('https://id5.fandom.com/wiki/Antiquarian', 'Antiquarian', 'https://static.wikia.nocookie.net/id5/images/2/23/Antiquarian.png/revision/latest?cb=20230424214939');
                break;
                case 'composer':
                case 'frederick':
                case 'frederick kreiburg':
                    createEmbed('https://id5.fandom.com/wiki/Composer', 'Composer', 'https://static.wikia.nocookie.net/id5/images/6/60/Composer.png/revision/latest?cb=20221211080027');
                break;
                case 'journalist':
                case 'alice':
                case 'alice deross':
                    createEmbed('https://id5.fandom.com/wiki/Journalist', 'Journalist', 'https://static.wikia.nocookie.net/id5/images/1/1e/Journalist.png/revision/latest?cb=20230623151032');
                break;
                case 'aeroplanist':
                case 'charles':
                case 'charles holt':
                    createEmbed('https://id5.fandom.com/wiki/Aeroplanist', 'Aeroplanist', 'https://static.wikia.nocookie.net/id5/images/b/b0/Aeroplanist.png/revision/latest?cb=20230718144728');
                break;
                case 'cheerleader':
                case 'lily':
                case 'lily barriere':
                    createEmbed('https://id5.fandom.com/wiki/Cheerleader', 'Cheerleader', 'https://static.wikia.nocookie.net/id5/images/b/b7/Cheerleader.png/revision/latest?cb=20230831053233');
                break;
                case 'puppeteer':
                case 'matthias':
                case 'matthias czernin':
                    createEmbed('https://id5.fandom.com/wiki/Puppeteer', 'Puppeteer', 'https://static.wikia.nocookie.net/id5/images/7/7a/Puppeteer.png/revision/latest?cb=20240121234914');
                break;
                case 'fire investigator':
                case 'florian':
                case 'florian brand':
                    createEmbed('https://id5.fandom.com/wiki/Fire_Investigator', 'Fire investigator', 'https://static.wikia.nocookie.net/id5/images/4/43/FireInvestigator.png/revision/latest?cb=20240414222906');
                break;
                case 'hell ember':
                case 'leo':
                case 'leo beck':
                    createEmbed02('https://id5.fandom.com/wiki/Fire_Investigator', 'Hell ember', 'https://static.wikia.nocookie.net/id5/images/e/eb/HellEmber.png/revision/latest?cb=20210515113318')
                break;
                case 'smiley face':
                case 'joker':
                    createEmbed02('https://id5.fandom.com/wiki/Smiley_Face', 'Smiley face', 'https://static.wikia.nocookie.net/id5/images/6/66/SmileyFace.png/revision/latest?cb=20190110191411')
                break;
                case 'the ripper':
                case 'ripper':
                case 'jack':
                    createEmbed02('https://id5.fandom.com/wiki/The_Ripper', 'The ripper', 'https://static.wikia.nocookie.net/id5/images/8/82/TheRipper.png/revision/latest?cb=20180725225333')
                break;
                case 'gamekeeper':
                case 'bane perez':
                case 'bane':
                    createEmbed02('https://id5.fandom.com/wiki/Gamekeeper', 'Gamekeeper', 'https://static.wikia.nocookie.net/id5/images/b/b3/Gamekeeper.png/revision/latest?cb=20240121133845')
                break;
                case 'soul weaver':
                case 'violetta':
                    createEmbed02('https://id5.fandom.com/wiki/Soul_Weaver', 'Soul Weaver', 'https://static.wikia.nocookie.net/id5/images/b/b2/SoulWeaver.png/revision/latest?cb=20210213182011')
                break;
                case 'geisha':
                case 'michiko':
                    createEmbed02('https://id5.fandom.com/wiki/Geisha', 'Geisha', 'https://static.wikia.nocookie.net/id5/images/a/ab/Geisha.png/revision/latest?cb=20210510045511')
                break;
                case 'the feaster':
                case 'feaster':
                case 'Hastur':
                    createEmbed02('https://id5.fandom.com/wiki/The_Feaster', 'The Feaster', 'https://static.wikia.nocookie.net/id5/images/4/4d/TheFeaster.png/revision/latest?cb=20210518132104')
                break;
                case 'wu chang':
                case 'xie bian and fan wujiu':
                    createEmbed02('https://id5.fandom.com/wiki/Wu_Chang', 'Wu Chang', 'https://static.wikia.nocookie.net/id5/images/4/4c/WuChang.png/revision/latest?cb=20181212105054')
                break;
                case 'photographer':
                case 'joseph':
                case 'joseph desaulniers':
                    createEmbed02('https://id5.fandom.com/wiki/Photographer', 'Photographer', 'https://static.wikia.nocookie.net/id5/images/2/2f/Photographer.png/revision/latest?cb=20181212105257')
                break;
                case 'mad eyes':
                case 'burke':
                case 'burke lapadura':
                    createEmbed02('https://id5.fandom.com/wiki/Mad_Eyes', 'Mad Eyes', 'https://static.wikia.nocookie.net/id5/images/0/0e/MadEyes.png/revision/latest?cb=20210516050012')
                break;
                case 'dream witch':
                case 'yidhra':
                    createEmbed02('https://id5.fandom.com/wiki/Dream_Witch', 'Dream Witch', 'https://static.wikia.nocookie.net/id5/images/8/89/DreamWitch.png/revision/latest?cb=20210516051547')
                break;
                case 'axe boy':
                case 'robbie':
                case 'robbie white':
                    createEmbed02('https://id5.fandom.com/wiki/Axe_Boy', 'Axe Boy', 'https://static.wikia.nocookie.net/id5/images/3/32/AxeBoy.png/revision/latest?cb=20210226051311')
                break;
                case 'evil reptilian':
                case 'luchino':
                case 'luchino diruse':
                    createEmbed02('https://id5.fandom.com/wiki/Evil_Reptilian', 'Evil Reptilian', 'https://static.wikia.nocookie.net/id5/images/2/24/EvilReptilian.png/revision/latest?cb=20191106131938')
                break;
                case 'bloody queen':
                case 'mary':
                    createEmbed02('https://id5.fandom.com/wiki/Bloody_Queen', 'Bloody Queen', 'https://static.wikia.nocookie.net/id5/images/c/c3/BloodyQueen.png/revision/latest?cb=20210501005713')
                break;
                case 'guard 26':
                case 'bonbon':
                    createEmbed02('https://id5.fandom.com/wiki/Guard_26', 'Guard 26', 'https://static.wikia.nocookie.net/id5/images/8/89/Guard26.png/revision/latest?cb=20210518132317')
                break;
                case 'disciple':
                case 'ann':
                    createEmbed02('https://id5.fandom.com/wiki/%22Disciple%22', 'Disciple', 'https://static.wikia.nocookie.net/id5/images/b/bd/Disciple.png/revision/latest?cb=20210424125335')
                break;
                case 'violinist':
                case 'antonio':
                    createEmbed02('https://id5.fandom.com/wiki/Violinist', 'Violinist', 'https://static.wikia.nocookie.net/id5/images/f/f1/Violinist.png/revision/latest?cb=20231028103747')
                break;
                case 'sculptor':
                case 'galatea':
                case 'galatea claude':
                    createEmbed02('https://id5.fandom.com/wiki/Sculptor', 'Sculptor', 'https://static.wikia.nocookie.net/id5/images/5/53/Sculptor.png/revision/latest?cb=20230803012730')
                break;
                case 'undead':
                case 'percy':
                    createEmbed02('https://id5.fandom.com/wiki/%22Undead%22', 'Undead', 'https://static.wikia.nocookie.net/id5/images/b/bf/Undead.png/revision/latest?cb=20210131045455')
                break;
                case 'the breaking wheel':
                case 'breaking wheel':
                case 'will brothers':
                case 'the will brothers':
                    createEmbed02('https://id5.fandom.com/wiki/The_Breaking_Wheel', 'Breaking Wheel', 'https://static.wikia.nocookie.net/id5/images/b/b1/TheBreakingWheel.png/revision/latest?cb=20210422024953')
                break;
                case 'naiad':
                case 'grace':
                    createEmbed02('https://id5.fandom.com/wiki/Naiad', 'Naiad', 'https://static.wikia.nocookie.net/id5/images/f/fd/Naiad.png/revision/latest?cb=20210730023355')
                break;
                case 'wax artist':
                case 'philippe':
                    createEmbed02('https://id5.fandom.com/wiki/Wax_Artist', 'Wax Artist', 'https://static.wikia.nocookie.net/id5/images/3/38/WaxArtist1.png/revision/latest?cb=20211118005703')
                break;
                case 'nightmare':
                    createEmbed02('https://id5.fandom.com/wiki/%22Nightmare%22', 'Nightmare', 'https://static.wikia.nocookie.net/id5/images/8/89/%22Nightmare%22.png/revision/latest?cb=20220106031159')
                break;
                case 'clerk':
                case 'keigan':
                case 'keigan nicholas keogh':
                    createEmbed02('https://id5.fandom.com/wiki/Clerk', 'Clerk', 'https://static.wikia.nocookie.net/id5/images/4/48/Clerk.png/revision/latest/scale-to-width-down/1000?cb=20220321184401')
                break;
                case 'hermit':
                case 'alva':
                case 'alva lorenz':
                    createEmbed02('https://id5.fandom.com/wiki/Hermit', 'Hermit', 'https://static.wikia.nocookie.net/id5/images/1/1e/Hermit.png/revision/latest?cb=20230221143134')
                break;
                case 'opera singer':
                case 'sangria':
                    createEmbed02('https://id5.fandom.com/wiki/Opera_Singer', 'Opera Singer', 'https://static.wikia.nocookie.net/id5/images/8/83/OperaSinger.png/revision/latest?cb=20230623150736')
                break;
                case 'fools gold':
                    createEmbed02('https://id5.fandom.com/wiki/%22Fool%27s_Gold%22', 'Fools Gold', 'https://static.wikia.nocookie.net/id5/images/6/6b/FoolsGold.png/revision/latest?cb=20231017031013')
                break;
                case 'the shadow':
                case 'ivy':
                case 'shadow':
                    createEmbed02('https://id5.fandom.com/wiki/The_Shadow', 'The Shadow', 'https://static.wikia.nocookie.net/id5/images/b/ba/TheShadow.png/revision/latest?cb=20240301181607')
                break;
                default:
                    await interaction.reply('Unable to find character. Please make sure the spelling is correct and characters game names are used. \n Ex: The ripper, Lucky guy, Doctor. \n\n Im working to allow for any diferent variation of a characters name to be used')
                break;

            }
        break;

        case 'joke':
            let joke = jokes[Math.floor(Math.random() * jokes.length)]

            let jokeEmbed = new EmbedBuilder()
                .setColor(0x5100ff)
                .setDescription(joke);

            await interaction.reply({ embeds: [jokeEmbed]});
        break;

        case 'random-character':
            switch (interaction.options.get('faction').value) {
                case "survivor":
                    temp = survivors[Math.floor(Math.random() * survivors.length)]
                break;
                case "hunter":
                    temp = hunters[Math.floor(Math.random() * hunters.length)]
                break;
                case "both":
                    temp02 = Math.floor(Math.random() * 2)
                    if (temp02 == 0) {
                        temp = survivors[Math.floor(Math.random() * survivors.length)]
                    } else {
                        temp = hunters[Math.floor(Math.random() * hunters.length)]
                    }
                break;
            }
            await interaction.reply(temp);
        break;

        case 'coin-toss':
            temp = Math.floor(Math.random() * 10002)
            if (temp == 10001) {
                await interaction.reply('It landed on the side :(');
            } else if (temp > 5000) {
                await interaction.reply('Heads');
            } else {
                await interaction.reply('Tails');
            }
        break;

        case 'ship':
            let ship_characters = []

            for (let i = 0; i < 2; i++) {

                if (Math.floor(Math.random() * 2)  == 0) {
                    ship_characters.push(survivors[Math.floor(Math.random() * survivors.length)])
                } else {
                    ship_characters.push(hunters[Math.floor(Math.random() * hunters.length)])
                }
            }
            interaction.reply(ship_characters[0] + ' + ' + ship_characters[1]);
        break;

        default:
            console.log('Error: No command recognised');
        break;
    }
});




client.login(token);
