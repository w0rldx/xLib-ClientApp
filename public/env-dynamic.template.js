(function(window) {
  if(import.meta.env.PROD){
    window["env"] = window["env"] || {};
    window["env"]["APIURL"] = "${API_URL}";
  }
})(this);