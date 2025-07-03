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
        const exists = this.historyStack.findIndex(elem => elem.city.toLowerCase() === cityElem.city.toLowerCase())
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
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.historyStack))
        } catch (error) {
            console.error('Failed to save to local storage')
        }
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
            try {
                localStorage.setItem(this.storageKey, JSON.stringify(this.historyStack))
            } catch (error) {
                console.error('Failed to save to local storage')
            }
        }
       
    }

    clearHistory() {   
        this.historyStack = []
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.historyStack))
        } catch (error) {
            console.error('Failed to save to local storage')
        }
    }

    _saveToStorage(history) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.historyStack))
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