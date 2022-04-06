var myObj = {
    name : " 极客时间 ",
    showThis: function(){
        this.name = " 极客邦 "
        console.log(this)
    }
}
var foo = myObj.showThis
foo()
