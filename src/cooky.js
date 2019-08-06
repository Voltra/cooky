const Cooky = {
    /**
     * Retrieve all the cookies available
     * @author Voltra
     * @throws {Error} If there's any error happening while parsing the cookies
     * @returns {array} Returns an array cookies objects that are of the following form {name: String, value: String}
     */
    getAll(){
        return document.cookie
        .split("; ")
        .map(cookieStr=>{
            /*const cookieParts = cookieStr.split("=");
            
            if(cookieParts.length < 2)
                throw new Error("An error occured while parsing a cookie");
            
            return {
                name: decodeURIComponent(cookieParts[0]),
                value: decodeURIComponent(cookieParts[1]),
                meta: cookieParts.slice(2).map(decodeURIComponent)
            };*/
            
            const splat = cookieStr.split("=");
            const name = splat[0];
            const valueToProcess = splat.slice(1).join("=").split("&");
            let value = "";
            
            if(valueToProcess.length <= 1)
                value = decodeURIComponent(valueToProcess.join(""));
            else{
                value = {};
                for(const pair of valueToProcess){
                    const [key, val] = pair.split("=");
                    value[decodeURIComponent(key)] = decodeURIComponent(val);
                }
            }
            
            return {
                name,
                value
            }
        });
    },
    
    //////////////////////////////////////////////////////////////////
    /**
     * Retrieve all the cookies available as an Object
     * @author Voltra
     * @returns {Object} returns an object which's keys are the name of the cookies and values are their respective values
     */
    getAllAsObject(){
        return this.getAll()
        .reduce((acc, elem)=>{
            acc[elem.name] = elem.value;
            return acc;
        }, {});
    },
    
    //////////////////////////////////////////////////////////////////
    /**
     * Retrieve all the cookies available as a Map
     * @author Voltra
     * @returns {Map} the cookies as name->value
     */
    getAllAsMap(){
        if(!Map)
            throw new Error("Your navigator doesn't support Map");
        
        return new Map(Object.entries(this.getAllAsObject()));
    },
    
    //////////////////////////////////////////////////////////////////
    
    /**
     * Retrieve the value of the cookie which has the given name
     * @author Voltra
     * @throws {TypeError} if the name is not a String or a string literal
     * @throws {Error} if there's an error while parsing cookies (very rare)
     * @param   {string} name - being the name of the desired cookie
     * @returns {string|null}  null if there's no such cookie, its value otherwise
     */
    get(name){
        if(typeof name != "string")
            throw new TypeError("The name of a cookie is always a String");
        
        const cookies = this.getAll();
        
        return cookies.find(cookie => cookie.name === name);
    },
    
    //////////////////////////////////////////////////////////////////
    
    /**
     * Sets a cookie
     * @author Voltra
     * @throws {TypeError} If one of the parameters is not a String or a string literal
     * @param   {string} name - being the cookie's name
     * @param   {string} value - being the cookie's value
     * @returns {this} return this
     */
    set(name, value){
        if(typeof name != "string")
            throw new TypeError("A cookie's name must be a String");
        
        if(typeof value != "string")
            throw new TypeError("A cookie's value must be a String");
        
        document.cookie = `${name}=${value}`;
        
        return this;
    },
    
    //////////////////////////////////////////////////////////////////
    
    /**
     * Determine whether or not there's a cookie that has the given name
     * @author Voltra
     * @throws {TypeError} if the given name is not a String or a string literal
     * @param   {string} name - being the name of the cookie
     * @returns {bool} TRUE if there is one, FALSE otherwise
     */
    has(name){
        if(typeof name != "string")
            throw new TypeError("A cookie's name must be a String");
        
        return this.getAllAsObject().hasOwnProperty(name);
    }
}

//////////////////////////////////////////////////////////////////

//Make Cooky (and its properties) immutable
function makeImmutable(object){
    Object.freeze(object);
    
    for(let field in object)
        Object.freeze(object[field]);
    
    return object;
}

makeImmutable(Cooky);

if(typeof window != "undefined")
    window.Cooky = Cooky;

export {
    Cooky,
}