var a=3;
function c(){
    alert(a);
}
(function(){
    var a=4;
    c();
})();


var b = 10;
(function b(){
    b = 20;
    console.log(b);
})()