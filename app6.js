var url = "basedatos.xlsx";
var oReq = new XMLHttpRequest();
let datosTransmit = DATA2;

oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];

  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  
  //console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));

    let datosExcel = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    let datosPostman = datosExcel


    console.log(datosExcel);

    for( i in datosExcel){

        let search_result = false;

        for (k in datosTransmit) {
    
            if (datosExcel[i].Key == datosTransmit[k].key) {
    
                //document.write(datosExcel[i].key + " --> True" + "</br>");
                search_result = true;
        
             } //else {
    
            //     document.write(datosExcel[i].key + " --> False" + "</br>");
            // }
    
        } 

        if (datosExcel[i].Brasileño != null) {
            datosPostman[i].Brasileño = {
            "category": "GlobalID",
            "key": datosExcel[i].Key,
            "value": datosExcel[i].Brasileño,
            "locale": "pt-BR"
            }
        }

        if (datosExcel[i].Italiano != null) {
            datosPostman[i].Italiano = {
            "category": "GlobalID",
            "key": datosExcel[i].Key,
            "value": datosExcel[i].Italiano,
            "locale": "it-IT"
            }
        }

        if (datosExcel[i].Español != null) {
            datosPostman[i].Español = {
            "category": "GlobalID",
            "key": datosExcel[i].Key,
            "value": datosExcel[i].Español,
            "locale": "es-ES"
            }
        }

        if (datosExcel[i].Ingles != null) {
            datosPostman[i].Ingles = {
            "category": "GlobalID",
            "key": datosExcel[i].Key,
            "value": datosExcel[i].Ingles,
            "locale": "en-US"
            }
        }

        if (datosExcel[i].Portugues != null) {
            datosPostman[i].Portugues = {
            "category": "GlobalID",
            "key": datosExcel[i].Key,
            "value": datosExcel[i].Portugues,
            "locale": "pt-PT"
            }
        }
    
        document.write(datosExcel[i].Key + " --> " + search_result + "</br>");
    }

    console.log(datosPostman);

}

oReq.send();