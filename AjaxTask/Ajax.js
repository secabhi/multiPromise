function Ajax() {
    var tmpArg=arguments;
    var myResponseArr={length:0},
        indx=0;
    return {
        // Custom Promiss implementation
        then:function (resolved,reject) {
            try{
                var makeReq=function(urlLnk,len,indVl) {
                    var xhr = new XMLHttpRequest();                    
                    //Conditional xhr open parameters
                    xhr.open(urlLnk.method?urlLnk.method:"GET", urlLnk.url?urlLnk.url:urlLnk, !urlLnk.sync);
                    xhr.responseType = urlLnk.responseType?urlLnk.responseType:'json';
                    xhr.onload = function (e) {
                        if (this.status == 200 && this.readyState == 4) {
                            myResponseArr[indVl]=this.response;
                            myResponseArr.length++;
                            // Index are used as closoure to put response in same order argument is passed
                            if(myResponseArr.length==len){
                                // Response when all ajax is finished
                                var arrVl=Array.prototype.slice.call(myResponseArr);
                                resolved(arrVl);
                            }
                        }
                    };
                    xhr.send();
                };
                for(var i=0;i<tmpArg.length;i++){
                    var reqThen=makeReq(tmpArg[i],tmpArg.length,indx);
                    indx++;
                }
            }catch(err){
                reject(err)
            }
        }
    }
}


/*Demo test
* 
* Parameter can be given object or string
* 
* Object Format 
* 
* {
     method:"POST",//Default Get
     url:"http://localhost:8086/fcv",
    sync:true // default false
 }
* 
* */
Ajax("http://localhost:8086/fcv","http://localhost:8086/fcv",{
    method:"POST",url:"http://localhost:8086/fcv"
}).then(function (itm,err) {
    if(err){
        console.log("Err came",err);
    }else {
        console.log("itm: ", itm)
    }
});