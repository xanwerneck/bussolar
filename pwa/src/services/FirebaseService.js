import {firebaseDatabase} from '../utils/firebaseUtils'

export default class FirebaseService {

    static getDataList = (nodePath, callback, size = 10) => {
        firebaseDatabase.collection(nodePath).get()
        .then(data => {
            var items = []
            data.forEach(doc => {
                items.push({key: doc.id , value: doc.data()})
            })
            callback(items)
        })
        .catch(error => {
            console.log(error)
            console.log('Erro recuperando os dados')
            callback([])
        })
    };

    static get = (nodePath, document, callback) => {
        firebaseDatabase.collection(nodePath).doc(document).get()
        .then(data => {
            callback(data.data())
        })
        .catch(error => {
            console.log('Erro recuperando os dados')
            callback([])
        })
    };

    static update = (nodePath, document, objToSubmit, callback) => {
        firebaseDatabase.collection(nodePath)
        .doc(document)
        .set(objToSubmit)
        .then(data => {
            callback(true)
        })
        .catch(error => {
            callback(false)
        })
    };

    static pushData = (node, objToSubmit, callback) => {
        let nodes = firebaseDatabase.collection(node)
        .add(objToSubmit)
        .then(data => {
            callback(data.id)
        })
        .catch(error => {
            console.log('Erro ao incluir dados')
            callback(null)
        })
    };

    static remove = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove();
    };
    
}