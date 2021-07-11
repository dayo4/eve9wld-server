const { fsx, path, knex, hlp } = require('../../plugins')
const UserZero = require('./UserZero')
const Settings = require('./Settings')

module.exports = {

    async init() {
        // try
        // {
        // const config = await fsx.readJSON(path.join(__dirname, 'conf.json'))
        // if (config.initialized === true)
        //     return true
        // else
        // {
        try {
            const initialized = await Promise.all([UserZero.register(), Settings.createTable()])
            if (initialized)
                 await fsx.writeJson(path.join(__dirname, 'conf.json'), { initialized: true }).then(done=>{
                     console.log('done')
                 }).catch(e=>{
                     console.log('error: ',e)
                 })
        } catch (e) {
            hlp.error(e)
        }
        //     }
        // }
        // catch (e)
        // {
        //     hlp.error(e)
        // }
    },

    async getSettings() {
        try {
            return await knex('system_settings').first()
        }
        catch (e) {
            hlp.error(e)
        }
    }

}
