var vars = {
	names: [],
	values: [],
	toreturn: "",
}
new function() {
    var ext = this;
    ext.t = function(a) {
        return !0;
    }, ext.t2 = function(a) {
        return !0;
    }, ext._shutdown = function() {}, ext._getStatus = function() {
        return {
            status: 2,
            msg: "Ready"
        };	
    };
    var descriptor = {
        blocks: [
            ["b", "Installed?", "t"],
            ["r", "Installed?", "t2"]
        ]
    };
    ScratchExtensions.register("Mod Installed?", descriptor, ext)
}, new function() {
    var ext = this,
        Code = "";
    ext.Code = function(code, callback) {
        eval(code);
        if("function" == typeof callback) callback();
    }, ext._shutdown = function() {}, ext._getStatus = function() {
        return {
            status: 2,
            msg: "Ready"
        };
    };
    var descriptor = {
        blocks: [
            ["w", "Run JS %s", "Code", 'console.log("Hello world!");']
        ]
    };
    ScratchExtensions.register("Run Javascript", descriptor, ext)
}, new function() {
    var ext = this;
    ext.Code = function(code, callback) {
        var c = window.open("", "", "location=no,toolbar=0,width=720,height=720");
        c.document.body.innerHTML = code;
		if("function" == typeof callback) callback();
    }, ext._shutdown = function() {}, ext._getStatus = function() {
        return {
            status: 2,
            msg: "Ready"
        };
    };
    var descriptor = {
        blocks: [
            ["w", "Run HTML %s", "Code", "Hello World!"]
        ]
    };
    ScratchExtensions.register("Run HTML", descriptor, ext)
}, new function() {
	var ext = this;
	ext.crtVar = function(name,callback) {
		vars.names.push(name);
		vars.values.push(0);
		console.log(name,"=",0);
		if("function" == typeof callback) callback();
	},
	ext.setVar = function(name,value,callback){
		if(vars.names.indexOf(name)>(-1)) { 
			vars.values[vars.names.indexOf(name)] = value; 
			console.log(name,"=",value); 
		} else {
			console.log("Variable name,",name,"not found!");
		}
		if("function" == typeof callback) callback();
	},
	ext.delVar = function(name,callback){
		if(vars.names.indexOf(name)>(-1)) { 
			vars.values.splice(vars.names.indexOf(name),vars.names.indexOf(name)); 
			console.log("Variable",name,"deleted!"); 
		} else {  
			console.log("Variable name,",name,"not found!");
		}
		if("function" == typeof callback) callback();
	},
	ext.getVal = function(name,callback){
		return vars.values[vars.names.indexOf(name)];
	}, ext._shutdown = function() {}, ext._getStatus = function() {
        return {
            status: 2,
            msg: "Ready",
        };
    };
	var descriptor = {
        blocks: [
            ["w", "Create Variable %s", "crtVar", "name"],
			["w", "Set Variable %s to %s", "setVar", "name", "value"],
			["w", "Delete Variable %s", "delVar", "name"],
			["r", "Variable %s", "getVal", "name"]
        ]
    };
	ScratchExtensions.register("Variables", descriptor, ext);
}, new function() {
	var ext = this;
	
	ext.Get_CloudVar = function(ProjID,CloudDataID,callback){
		$.getJSON("https://scratch.mit.edu/varserver/"+ProjID,function(json){
			var GETnum = function(name){
				list = json.variables;
				for(ASjF=0;ASjF<list.length;ASjF++){
					if(list[ASjF].name==name){
						return ASjF;
					}
				}
				return undefined;
			}
			vars.toreturn = json.variables[GETnum("☁ "+CloudDataID)].value.toString();
		});
		return vars.toreturn;
	},
	ext.getStatsViews = function(UserID,ProjID,callback){
		$.getJSON("https://api.scratch.mit.edu/users/"+UserID+"/projects/"+ProjID,function(json){
			vars.toreturn = json.stats.views;
		});
		return vars.toreturn;
	},
	ext.getStatsLoves = function(UserID,ProjID,callback){
		$.getJSON("https://api.scratch.mit.edu/users/"+UserID+"/projects/"+ProjID,function(json){
			vars.toreturn = json.stats.loves;
		});
		return vars.toreturn;
	},
	ext.getStatsFavourites = function(UserID,ProjID,callback){
		$.getJSON("https://api.scratch.mit.edu/users/"+UserID+"/projects/"+ProjID,function(json){
			vars.toreturn = json.stats.favorites;
		});
		return vars.toreturn;
	},
	ext.getStatsComments = function(UserID,ProjID,callback){
		$.getJSON("https://api.scratch.mit.edu/users/"+UserID+"/projects/"+ProjID,function(json){
			vars.toreturn = json.stats.comments;
		});
		return vars.toreturn;
	},
	ext._shutdown = function() {}, ext._getStatus = function() {
        return {
            status: 2,
            msg: "Ready",
        };
    };
    var descriptor = {
        blocks: [
            ["r", "GET Cloud_Vars ProjID: %s CloudDataID: ☁ %s", "Get_CloudVar", "140134783","Cloud_Variable"],
			["r", "GET Views from UserID: %s ProjID: %s", "getStatsViews", "-Elec-", "140134783"],
			["r", "GET Loves from UserID: %s ProjID: %s", "getStatsLoves", "-Elec-", "140134783"],
			["r", "GET Favorites UserID: %s from ProjID: %s", "getStatsFavourites", "-Elec-", "140134783"],
			["r", "GET Comment Count from UserID: %s ProjID: %s", "getStatsComments", "-Elec-", "140134783"],
        ]
    };
    ScratchExtensions.register("EXPERIMENTAL: Advanced stuff", descriptor, ext)
};
