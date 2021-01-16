import FirebaseService from "../services/FirebaseService";

var publicToken = '6PRZZ474JFSQOARK3MDRNOW7QIONFPG3'

var getDate = () => {
    var dt = new Date()
    return dt.getDate().toString() + (dt.getMonth() + 1).toString() + dt.getFullYear().toString()
}

export const getIntent = (message) => {
    const uri = 'https://api.wit.ai/message?v=' + getDate() + '&q=' + encodeURIComponent(message)
    return fetch(uri, { headers : { 'Authorization' : 'Bearer ' + publicToken } })
}

export const getResponse = (intent, callback) => {
    FirebaseService.get('response_chatbot', intent, callback)
}

