(function UniversalModuleDefinition(root, factory){
	if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else{
		const module_name = "Cooky";
		if(typeof define === 'function' && define.amd)
			define(module_name, [], factory);
		else
			if(typeof exports === 'object')
				exports[module_name] = factory();
			else
				root[module_name] = factory();
	}
})(this, function(){
    return {getAll:function(){return document.cookie.split("; ").map(function(e){var r=e.split("=");if(2!=r.length)throw new Error("An error occured while parsing a cookie");return{name:r[0],value:r[1]}})},getAllAsObject:function(){return this.getAll().reduce(function(e,r){return e[r.name]=r.value,e},{})},getAllAsMap:function(){if(!Map)throw new Error("Your navigator doesn't support Map");return new Map(Object.entries(this.getAllAsObject()))},get:function(e){if("string"!=typeof e)throw new TypeError("The name of a cookie is always a String");var r=this.getAll(),t=!0,n=!1,o=void 0;try{for(var i,u=r[Symbol.iterator]();!(t=(i=u.next()).done);t=!0){var a=i.value;if(a.name===e)return a.value}}catch(e){n=!0,o=e}finally{try{!t&&u.return&&u.return()}finally{if(n)throw o}}return null},set:function(e,r){if("string"!=typeof e)throw new TypeError("A cookie's name must be a String");if("string"!=typeof r)throw new TypeError("A cookie's value must be a String");return document.cookie=e+"="+r,this},has:function(e){if("string"!=typeof e)throw new TypeError("A cookie's name is a String");return this.getAllAsObject().hasOwnProperty(e)}};
});