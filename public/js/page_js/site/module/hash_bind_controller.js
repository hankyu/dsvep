function hashBindController()
{
    var 
        hash;
    
    function init(cb){
        var callback = typeof(cb) == 'function' ? cb : null;
        getHash();
        if(callback){ callback(hash); }
    }

    function setHash(h)
    {
        location.hash = hash = h;
    }

    function getHash()
    {
        hash = location.hash;
        hash = hash.substr(1,hash.length-1);
    }
    return {
        init: init,
        setHash: setHash
    };
}