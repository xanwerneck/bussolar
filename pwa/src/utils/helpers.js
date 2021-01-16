
var mascaraCPF = (data) => {
    /* Remove caractere nao numericos */
    data = data.replace(/[^\d]/g, "")
    data = data.replace(/(\d{3})(\d)/, "$1.$2")
    data = data.replace(/(\d{3}).(\d{3})(\d)/, "$1.$2.$3")
    data = data.replace(/(\d{3}).(\d{3}).(\d{3})(\d)/, "$1.$2.$3-$4")
    /* Mascara CPF */
    return data.replace(/(\d{3}).(\d{3}).(\d{3})-(\d{2})(\d)/, "$1.$2.$3-$4")
}

var mascaraData = (data) => {

    data = data.toDate()
    var dd = data.getDate();
    var mm = data.getMonth()+1; //January is 0!
    var yyyy = data.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
}

var mascaraCep = (data) => {
    /* Remove caractere nao numericos */
    data = data.replace(/[^\d]/g, "")
    /* Mascara CEP */
    return data.replace(/(\d{5})(\d{3})/, "$1-$2")
}

var apenasNumeros = (data) => {
    return data.replace(/[^\d]/g, "")
}

var calculaTempo = (data) => {
    var data1 = data.toDate()
    var data2 = new Date()

    var dif =
        Date.UTC(data1.getYear(),data1.getMonth(),data1.getDate(),0,0,0)
      - Date.UTC(data2.getYear(),data2.getMonth(),data2.getDate(),0,0,0);
    dif=Math.abs((dif / 1000 / 60 / 60));
    var difH=Math.abs(data2.getHours()-data1.getHours());
    var difM=Math.abs(data2.getMinutes()-data1.getMinutes());
    var difS=Math.abs(data2.getSeconds()-data1.getSeconds());
    return ((dif+difH)+" hrs   "+difM+" min e "+difS+" seg");
}

function diferencaDias(data1, data2){
    
}

module.exports  = {
    mascaraCPF,
    mascaraData,
    mascaraCep,
    apenasNumeros,
    calculaTempo
}