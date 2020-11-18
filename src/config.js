let API_SERVER = ''
let URL_JAVA = ''
if( location.hostname == "localhost" ){
    API_SERVER= 'http://tdec.api.yl-mall.cn/'
    URL_JAVA = 'http://58.33.165.250:20010/'
}else {
    API_SERVER= 'http://tdec.api.yl-mall.cn/'
    URL_JAVA = 'http://58.33.165.250:20010/'
}

export {
    API_SERVER,
    URL_JAVA
}