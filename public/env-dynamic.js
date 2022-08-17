(function(window) {
  if(import.meta.env.PROD){
    window["env"] = window["env"] || {};
    window["env"]["APIURL"] = "http://localhost:30231/api/";
  }
})(this);