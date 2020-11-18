import serve from './fetch'
import Base from 'Base/js/base64'
var base = new Base();

let a = localStorage.getItem('a');

class Http {
    request ({url, data = {}, method= 'post'}) {
        return new Promise((resolve,reject) => {
            this._request( url, resolve, reject, data, method )
        })
    }
    _request (url, resolve, reject, data, method) {
		    let serveoBJ= {};
		    //加密设置


	        let encryptdata;
	        a == 1? encryptdata= data: encryptdata=JSON.stringify({"@":base.encode(encodeURIComponent(data))});
            // let encryptdata= data;
            // let encryptdata=JSON.stringify({"@":base.encode(encodeURIComponent(data))})

        if (method == 'get') {
            serveoBJ= {
                url,
                method: method,
                params: data,
            }
        }else {
            serveoBJ= {
                url,
                method: method,
                data: {
                    json: encryptdata
                }
            }
        }

        
        serve( 
            serveoBJ
        ).then(res => {
            resolve( res )
        }).catch(err => {
            reject( err )
        })      
    } 
}

export default Http