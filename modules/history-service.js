import { logger } from "./logger.js"
import { CONFIG } from "./config.js"
export class HistoryService {
    constructor() {
        this.storageKey = CONFIG.STORAGE_KEYS.SEARCH_HISTORY
        this.maxItems = CONFIG.MAX_HISTORY_ITEMS
        this.historyStack = this._loadFromStorage()
    }

    addLocation(weatherData) {
        const cityElem = {
            city: weatherData.name,
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
            country: weatherData.sys.country,
            timestamp: new Date().toISOString()
        }
        if (this.historyStack.length > 0) {
            const exists = this.historyStack.findIndex( elem => typeof elem?.city === 'string' &&
                typeof cityElem?.city === 'string' &&
                elem.city.toLowerCase() === cityElem.city.toLowerCase())
            if (exists !== -1) {
                this.historyStack.splice(exists, 1)
                this.historyStack.unshift(cityElem)
                logger.info(`The city ${cityElem.city} was moved to the top of the history`)
            }
            else {
                this.historyStack.unshift(cityElem)
                logger.info(`The city ${cityElem.city} wass added to history`)
            }
            if (this.historyStack.length > this.maxItems)
                this.historyStack.shift()
        }
        else {
            this.historyStack.unshift(cityElem)
        }

       this._saveToStorage(this.historyStack)
    }

    getHistory() {
        const history = localStorage.getItem(this.storageKey)
        const historyElems = history ? JSON.parse(history) : []
        return historyElems
    }

    removeLocation(city) {
        const exists = this.historyStack.findIndex(elem => elem.city.toLowerCase() === city.toLowerCase())
        if (exists !== -1) {
            this.historyStack.splice(exists, 1)
         this._saveToStorage(this.historyStack)
         logger.debug(`Location ${city} was removed from history`)
        }

    }

    clearHistory() {
        this.historyStack = []
        this._saveToStorage(this.historyStack)
    }

    _saveToStorage(history) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(history))
        } catch (error) {
            console.error('Failed to save to local storage')
        }
    }

    _loadFromStorage() {
        const history = localStorage.getItem(this.storageKey)
        const historyElems = history ? JSON.parse(history) : []
        return historyElems
    }
}

export const historyService = new HistoryService()